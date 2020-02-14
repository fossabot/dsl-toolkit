#!/usr/bin/env node
const token = process.env.GITHUB_TOKEN
const s = require('shelljs')
const { request } = require("@octokit/request");
const packages = require('./lib/get-packages');
const pacageNames = packages.map(e=>require(`../${e}/package.json`).name).sort();
const diff = require('diff');
const authorization = `token ${token}`;
const gitUtility = require('./lib/git-utility');

(async () => {
    // const result = await request("GET /orgs/dsl-toolkit/repos", {
    //     headers: {
    //         authorization
    //     },
    // });
    // const existingRepos = result.data.map(e=>e.name).sort()
    // const toCreate = diff.diffArrays(pacageNames.sort(), existingRepos.sort()).filter(e=>e.removed).map(e=>e.value).flat()
    //
    // toCreate.forEach( async repository=> await request("POST /orgs/dsl-toolkit/repos",
    //     {headers: {authorization}, name: repository});
    // git branch  | grep "*" | awk '{print $2}'

    // const {currentBranch} = await execa('git branch  | grep "*" | awk "{print $2}"')
    // const {currentBranch} = await execa('git', ['branch',  '|', 'grep', '"*"' ,'|', 'awk', '"{print $2}"'])
    // console.log(await execa('git branch  | grep "*" | awk "{print $2}"'))
    // const subprocess = execa('grep', ['node'])
    // const res = await execa('ls', ['-lah']).stdout.pipe(subprocess.stdin)
    console.log(
        gitUtility.getCurrentBranch(),
        gitUtility.getAllBranches(),
        gitUtility.getAllRemoteBranches(),
        gitUtility.getAllRemotes()
    )


    // gitUtility.getAllBranches().split(' ').forEach(e=>console.log(`'${e}'`,"a"))


    // console.log(s.exec('git branch  | grep "*" | awk \'{print $2}\'', {silent:true}).stdout.split('\n').filter(e=>e!=='').join(''))
})()
