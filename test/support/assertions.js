/*global QUnit:true*/
QUnit.assert.haveClass = function(element, klass) {
  var message = 'expected element to have the "' + klass + '".',
      hasClass = element.classList.contains(klass);

  QUnit.push(hasClass, element.classList.toString(), klass, message);
};

QUnit.assert.notHaveClass = function(element, klass) {
  var message = 'expected element to not have the "' + klass + '".',
      hasClass = !element.classList.contains(klass);

  QUnit.push(hasClass, element.classList.toString(), klass, message);
};
