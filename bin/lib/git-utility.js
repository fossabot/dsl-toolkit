const s = require('shelljs')

module.exports = ex = {
    removeEmptyLines: (output) => output.split('\n').filter(e=>e!=='').join(''),
    exec: (command) => ex.removeEmptyLines(s.exec(command, {silent:true}).stdout),
    getCurrentBranch: () => ex.exec('git branch  | grep "*" | awk \'{print $2}\''),
    getAllBranches: () => ex.exec('git branch -a').split(' ').filter(e=>e!=='*'&&e!==''),
    getAllRemoteBranches: () => ex.getAllBranches().filter(e=>e.startsWith('remotes/')),
    getAllRemotes: () => ex.getAllRemoteBranches().map(e=>e.split('/')[1])
        .filter((v, i, a) => a.indexOf(v) === i),
    newBranch: (name) => ex.removeEmptyLines(`git checkout -b ${name}`),
    checkout: (name) => ex.exec(`git checkout ${name}`)
}
