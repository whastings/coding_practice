function getDependencies(tree) {
  var allDependencies = [],
      dependenciesHash = {};

  var processDependencies = function(treeLevel) {
    if (!treeLevel.hasOwnProperty('dependencies')) {
      return;
    }

    var dependencies = treeLevel.dependencies;

    Object.keys(dependencies).forEach(function(dependency) {
      var name = dependency + '@' + dependencies[dependency].version;
      if (!dependenciesHash[name]) {
        allDependencies.push(name);
        dependenciesHash[name] = true;
      }
      processDependencies(dependencies[dependency]);
    });
  };

  processDependencies(tree);
  return allDependencies.sort();
}

module.exports = getDependencies;
