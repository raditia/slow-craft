// Scroll reveal
(function () {
    var els = document.querySelectorAll('.bc-reveal');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
        els.forEach(function (el) {
            el.classList.add('is-visible');
        });
        return;
    }

    var groupCount = {};
    var delayMap = new WeakMap();

    els.forEach(function (el) {
        var g = el.getAttribute('data-reveal-group') || el.closest('[class*="bc-grid"], .bc-archive, .bc-writing-list') ? 'group' : '_';
        var i = groupCount[g] || 0;
        delayMap.set(el, i * 0.07);
        groupCount[g] = i + 1;
    });

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
            if (en.isIntersecting) {
                var el = en.target;
                var delay = delayMap.get(el) || 0;
                setTimeout(function () {
                    el.classList.add('is-visible');
                }, delay * 1000);
                io.unobserve(el);
            }
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -6% 0px' });

    els.forEach(function (el) { io.observe(el); });

    // Fallback
    setTimeout(function () {
        els.forEach(function (el) { el.classList.add('is-visible'); });
    }, 1600);
})();

// Mobile burger toggle
(function () {
    var burger = document.querySelector('.bc-burger');
    var header = document.getElementById('bc-head');
    if (!burger || !header) return;

    burger.addEventListener('click', function () {
        var open = header.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close on nav link click
    header.querySelectorAll('.bc-mobile-nav a').forEach(function (link) {
        link.addEventListener('click', function () {
            header.classList.remove('is-open');
            burger.setAttribute('aria-expanded', 'false');
        });
    });
})();
