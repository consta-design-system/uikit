module.exports = {
  types: [
    { value: 'feat', name: 'feat:      Adding new feature' },
    { value: 'fix', name: 'fix:       Bug fix' },
    { value: 'test', name: 'test:      Adding Tests' },
    {
      value: 'refactor',
      name: 'refactor:  Editing code without fixing bugs or adding new features',
    },
    { value: 'docs', name: 'docs:      Documentation Update' },
    { value: 'chore', name: 'chore      Add / update / customize tools and libraries' },
    { value: 'changelog', name: 'changelog      Add / update / changelog' },
    { value: 'release', name: 'release      New release' },
  ],

  scopes: [{ name: 'custom' }, { name: 'components' }, { name: 'global' }],

  messages: {
    type: 'Type of change',
    scope: 'Scope of changes (optional):',
    customScope: 'Enter your scope:',
    subject: 'Summary of changes:\n',
    body: 'Detailed description of changes:\n',
    breaking: 'Description BREAKING CHANGES:\n',
    confirmCommit: 'Save the resulting commit?',
    footer: 'Issue number  (Example: #101):\n',
  },
  footerPrefix: 'issue - ',
  allowBreakingChanges: ['feat', 'fix', 'test', 'refactor', 'docs', 'chore'],
  allowCustomScopes: true,
  subjectLimit: 100,
};
