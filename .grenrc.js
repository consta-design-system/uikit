module.exports = {
  dataSource: 'commits',
  prefix: '',
  includeMessages: 'commits',
  ignoreCommitsWith: ['merge', 'Merge', 'release', 'changelog', 'not-changelog'],
  ignoreTagsWith: [],
  changelogFilename: 'CHANGELOG.md',
  template: {
    commit: ({ message, url, author, name }) =>
      `- [${message}](${url}) - ${author ? `[@${author}](https://github.com/${author})` : name}`,
    issue: '- {{labels}} {{name}} [{{text}}]({{url}})',
    label: '[**{{label}}**]',
    noLabel: 'closed',
    group: '\n#### {{heading}}\n',
    changelogTitle: '# Changelog\n\n',
    release: '## {{release}} ({{date}})\n{{body}}',
    releaseSeparator: '\n--------------------\n\n',
  },
};
