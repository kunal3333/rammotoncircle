(function ($) {
  const $servicesBlock = $(".services-block");
  const $animationContainer = $(".animation-container");

  if (!$servicesBlock.length || !$animationContainer.length) return;

  if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      const $notProvide = $servicesBlock.find(".not-provide");
      const $provide = $servicesBlock.find(".provide");

      $notProvide.addClass("animated");
      $provide.addClass("scaled animated");
      $animationContainer.addClass("animated");
  } else {
      const lottieInstance = lottie.loadAnimation({
          container: $animationContainer[0],
          renderer: "svg",
          loop: false,
          autoplay: false,
          path: "./lottie/circles.json",
      });

      const $notProvide = $servicesBlock.find(".not-provide");
      const $provide = $servicesBlock.find(".provide");
      let hasAnimated = false;

      const animateElements = () => {
          $notProvide.each(function () {
              setTimeout(() => {
                  $(this).addClass("animated");
              }, 3000);
          });

          $provide.each(function (index) {
              setTimeout(() => {
                  $(this).addClass("scaled");
                  setTimeout(() => {
                      $(this).addClass("animated");
                  }, 1000);
              }, 2200 + 100 * index);
          });

          setTimeout(() => {
              $animationContainer.addClass("animated");
              lottieInstance.play();
          }, 2000);
      };

      const observer = new IntersectionObserver(
          (entries) => {
              entries.forEach((entry) => {
                  if (entry.isIntersecting && !hasAnimated) {
                      hasAnimated = true;
                      animateElements();
                      observer.unobserve($servicesBlock[0]);
                  }
              });
          },
          { root: null, threshold: 0.5 }
      );

      observer.observe($servicesBlock[0]);
  }
})(jQuery);