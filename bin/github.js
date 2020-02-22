#!/usr/bin/env node
const token = process.env.GITHUB_TOKEN || '9c8f3ccbcfc8607e7c5b54a0835baafede840cd2'
const s = require('shelljs')
const { request } = require("@octokit/request")
const packages = require('./lib/get-packages')
const pacageNames = packages.map(e=>require(`../${e}/package.json`).name).sort()
const diff = require('diff')
const authorization = `token ${token}`
const gitUtilityCreator = require('./lib/git-utility')
const dfp = require('directory-fixture-provider')
const {join} = require('path');
const getNewFixtureDirectory = (path) => {
    const fixtureDirectoryProvider = dfp(path).noFileReads()
    return fixtureDirectoryProvider.get('./').dir
}
const splitGitRepository = (gitUtility, currentBranch) => {
    packages.forEach(package => {
        gitUtility.subDirectoryToSeparateBranch(currentBranch, package)
    })
}

(async () => {
    const pwd = s.pwd()
    s.exec('npx lerna exec -- rm -rf ./node_modules', {silent:true}).stdout
    // s.exec('rm -rf ./node_modules', {silent:true}).stdout

    const baseFixtureDirectory = getNewFixtureDirectory(join(__dirname, '../'))
    s.exec(`rm -rf ${baseFixtureDirectory}/node_modules`, {silent:true}).stdout
    console.log({baseFixtureDirectory})

    const result = await request("GET /orgs/dsl-toolkit/repos", {
        headers: {
            authorization
        },
    });
    const existingRepos = result.data.map(e=>e.name).sort()
    const toCreate = diff.diffArrays(pacageNames.sort(), existingRepos.sort()).filter(e=>e.removed).map(e=>e.value).flat()

    toCreate.forEach( async repository=> await request("POST /orgs/dsl-toolkit/repos",
        {headers: {authorization}, name: repository}));

    const directory = getNewFixtureDirectory(baseFixtureDirectory);
    const gitUtility = gitUtilityCreator(directory)
    gitUtility.stash();

    console.log(
        gitUtility.getAllBranches(),
        gitUtility.getAllBranchesWithoutRemotes(),
    )
    const currentBranch = gitUtility.getCurrentBranch()
    const allBranches = gitUtility.getAllBranchesWithoutRemotes()
    splitGitRepository(gitUtility, currentBranch);

    allBranches.filter(e=>e!==currentBranch).forEach(branch => {
        gitUtility.checkoutBranch(branch)
        splitGitRepository(gitUtility, branch);git
    })



    console.log(`${pwd}`,directory)
    // gitUtility.subDirectoryToSeparateBranch(currentBranch)
    // gitUtility.getAllBranches().split(' ').forEach(e=>console.log(`'${e}'`,"a"))
    // console.log(s.exec('git branch  | grep "*" | awk \'{print $2}\'', {silent:true}).stdout.split('\n').filter(e=>e!=='').join(''))
})()
