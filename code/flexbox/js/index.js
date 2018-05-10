var r = 75,
    strokeWidth = 17,
    center = [r + strokeWidth, r + strokeWidth],
    circleStart = [r * 2 + strokeWidth, r + strokeWidth];

var scrollableElement = document.querySelector('.scroll');
var scrollableElementBounds = scrollableElement.getBoundingClientRect();
var scrollableElementHeight = scrollableElementBounds.height;
var windowHeight = window.innerHeight;

var svg = d3.select('.svg-container').append('svg').attr('width', r * 2 + strokeWidth * 2).attr('height', r * 2 + strokeWidth * 2);

var background = svg.append('circle').attr('cx', center[0]).attr('cy', center[1]).attr('r', r).attr('stroke-width', strokeWidth * 2).style('stroke', 'rgba(0, 0, 0, 0.5)').style('fill', 'none');

var bars = svg.append('circle').attr('cx', center[0]).attr('cy', center[1]).attr('r', r).attr('stroke-dasharray', '2, 10').attr('stroke-dashoffset', 0).attr('stroke-width', strokeWidth * 1.6).style('stroke', 'gray').style('fill', 'none');

var fullCircle = svg.append('circle').attr('cx', center[0]).attr('cy', center[1]).attr('r', r).attr('stroke-dasharray', r * Math.PI * 2).attr('stroke-dashoffset', 0).attr('stroke-width', 4).style('opacity', 0).style('stroke', 'white').style('fill', 'none');

var circle = svg.append('circle').attr('cx', center[0]).attr('cy', center[1]).attr('r', r).attr('stroke-dasharray', r * Math.PI * 2).attr('stroke-dashoffset', 0).attr('stroke-width', strokeWidth).style('stroke', 'rgb(255, 210, 63)').style('fill', 'none');

var control = svg.append('circle').attr('cx', center[0]).attr('cy', center[1]).attr('r', r).attr('stroke-dasharray', r * Math.PI * 2).attr('stroke-dashoffset', 0).attr('stroke-width', strokeWidth).style('stroke', 'transparent').style('fill', 'none');

var text = svg.append('text').attr('x', center[0]).attr('y', center[1]).attr('text-anchor', 'middle').style('fill', 'white').text('');

function getTheta(center, p1) {
  var v = new Victor(p1[0] - center[0], center[1] - p1[1]);
  if (p1[1] > center[1]) return v.horizontalAngleDeg() * -1;else return 360 - v.horizontalAngleDeg();
}

var circleLength = 2 * Math.PI * r,
    strokeTo = 0.001,
    strokeValue = 0,
    overlayOpaque = false,
    overlayVisible = false;

function updateOverlay() {
  if (overlayVisible && strokeValue < strokeTo !== overlayOpaque) {
    return;
  }
  if (strokeValue < strokeTo) circle.transition().style('opacity', 0.7);else circle.transition().style('opacity', 1);
  overlayOpaque = !(strokeValue < strokeTo);
  overlayVisible = true;
}

svg.on('mousemove', function () {
  var t = getTheta(center, d3.mouse(this));
  strokeTo = circleLength - circleLength * (t / 360);
  fullCircle.attr('stroke-dashoffset', strokeTo);
  updateOverlay();
});

svg.on('mouseover', function () {
  fullCircle.transition().style('opacity', 1);
  updateOverlay();
});

svg.on('mouseout', function () {
  fullCircle.transition().style('opacity', 0);
  overlayVisible = false;
});

svg.on('click', function () {
  var t = getTheta(center, d3.mouse(this));
  strokeValue = circleLength - circleLength * (t / 360);
  var percent = 100 - strokeValue / circleLength * 100;
  animateScrollTo((scrollableElementHeight - windowHeight) / 100 * percent);
});

var lastScrollY = 0;
function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
  var progressPercent = scrollY / (scrollableElementHeight - windowHeight) * 100;
  progressPercent = Math.min(100, Math.max(0, progressPercent));
  text.text(progressPercent.toFixed(1) + '%');
  strokeValue = circleLength - circleLength / 100 * progressPercent;
  circle.attr('stroke-dashoffset', strokeValue);
  updateOverlay();
}

requestAnimationFrame(animate);

function animateScrollTo(scrollTo) {
  var twe = new TWEEN.Tween({ y: scrollY }).to({ y: scrollTo }, 300).onUpdate(function update() {
    setScrollTop(this.y);
  }).start();
}

function setScrollTop(value) {
  if (window.scrollTo) {
    window.scrollTo(0, value);
  } else {
    document.body.scrollTop = value;
  }
}