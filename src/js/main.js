/**
 * [[Archivo global del proyecto]]
 * @private
 * @author Edith Ramirez <edith.ramirez@ingenia.com>
 */

(function ($) {
  let init = () => {
    if (document.querySelectorAll(".js-lazy").length) lazyLoadAssets();
    if (document.querySelectorAll(".js-imgResp").length) {
      changeImageResp();
      window.addEventListener("resize", () => {
        changeImageResp();
      });
    }
    if (document.querySelectorAll(".js-header").length) {
      headerMobileController();
      headerController();

      window.addEventListener("resize", () => {
        //SI existe la clase current ajustara y alineara el submenu
        if ($(".is-current.is-active").length) {
          let that = $(".is-current.is-active").find(".js-subLink");
          resizeMarginSubmenu(that);
        }
        //si cambia el tamaño a menor resolucion se cerrara el menu
        if ($(window).width() < 1024) {
          $(".js-menuClose").trigger("click");
          $("body").removeClass("has-filter");
        }
      });
    }
    if (document.querySelectorAll(".js-headerSearch").length)
      headerSearch();
    if (document.querySelectorAll(".js-sliderBlog").length)
      sliderBlogCard();
    if (document.querySelectorAll(".js-tabs").length) tabsController();
  };
  var index = 0;
  let tabsKey = function (tab) {
    tab.bind({
      keydown: function (ev) {
        var LEFT_ARROW = 37;
        var UP_ARROW = 38;
        var RIGHT_ARROW = 39;
        var DOWN_ARROW = 40;
        var k = ev.which || ev.keyCode;
        if (k >= LEFT_ARROW && k <= DOWN_ARROW) {
          if (k == LEFT_ARROW || k == UP_ARROW) {
            if (index > 0) {
              index--;
            } else {
              index = tab.length - 1;
            }
          } else if (k == RIGHT_ARROW || k == DOWN_ARROW) {
            if (index < tab.length - 1) {
              index++;
            } else {
              index = 0;
            }
          }
          $(tab.get(index)).click().trigger("focus");
          //console.log($(tab.get(index)))
        }
      },
    });
  };
  /**
   * @description Carga diferida de imagenes
   * */
  var lazyLoadAssets = () => {
    document.addEventListener("DOMContentLoaded", function () {
      var lazyloadImages;
      if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".js-lazy");
        var imageObserver = new IntersectionObserver(function (
          entries,
          observer
        ) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var image = entry.target;
              image.src = image.dataset.src;
              image.classList.remove("js-lazy");
              imageObserver.unobserve(image);
            }
          });
        });
        lazyloadImages.forEach(function (image) {
          imageObserver.observe(image);
        });
      } else {
        console.info("no soportado");
        notSupportedLazy();
        $(document).on("scroll", function () {
          notSupportedLazy();
        });
      }
    });
  };

  /**
   * @description Si no es soportada la carga diferida de imagenes
   * */
  var notSupportedLazy = () => {
    var imgLazy = $(".js-lazy"),
      timeLazy,
      scrollTop;
    scrollTop = $(window).scrollTop();
    for (var i = 0; i < imgLazy.length; i++) {
      if ($(imgLazy[i]).offset().top < $(window).height() + scrollTop) {
        $(imgLazy[i]).attr("src", $(imgLazy[i]).attr("data-src"));
        $(imgLazy[i]).removeClass("js-lazy");
      }
    }
  };

  /**
   * @description Manejo de images responsive
   * */
  var changeImageResp = () => {
    var image = $(".js-imgResp"),
      imgDesk,
      imgMob;

    for (var i = 0; i < image.length; i++) {
      imgDesk = $(image[i]).attr("data-desktop");
      imgMob = $(image[i]).attr("data-mobile");

      if ($(window).width() <= 768) {
        $(image[i]).attr("src", imgMob);
      } else {
        $(image[i]).attr("src", imgDesk);
      }
    }
  };
  /**
   * @description Funcion del menu mobile
   * */
  const headerMobileController = () => {
    //clic al burguer para abrir el menu
    $(".js-menuOpen").on("click", function (e) {
      e.preventDefault();
      $(".js-header").addClass("is-open");
      $("body").addClass("has-scrollHide");
    });

    //clic al burguer para cerrar el menu
    $(".js-menuClose").on("click", function (e) {
      e.preventDefault();
      $(".js-header").removeClass("is-open");
      $("body").removeClass("has-scrollHide");
      $(".js-menu")
        .find(".is-current")
        .removeClass("is-current is-active");
      $(".js-menu")
        .find(".has-focus")
        .removeClass("has-focus has-active");
      $(".js-subLink").attr({ "aria-expanded": "false" });
      $(".js-menu").find(".js-submenu").removeClass("has-hidden");
    });

    //clic para regresar al nivel anterio
    $(".js-subBack").on("click", function (e) {
      e.preventDefault();
      $(this).closest("li").removeClass("is-active is-current");
      $(".js-menu").find("li").removeClass("has-focus has-active");
      $(this)
        .parent(".js-submenu")
        .siblings(".js-subLink")
        .attr({ "aria-expanded": "true" });
      $(this).closest(".js-submenu.has-hidden").removeClass("has-hidden");
    });
  };
  /**
   * @description Funcion del menu
   * */
  const headerController = () => {
    //clic para mostrar el submenu
    $(".js-subLink").on("click", function (e) {
      e.preventDefault();
      let that = $(this),
        parent = that.parent("li");

      parent.siblings().removeClass("is-current is-active");

      //nivel 1
      if (that.attr("data-level") == 1) {
        that.parent().toggleClass("is-current is-active");
        if (!parent.hasClass("is-active")) {
          $(".js-subLink").attr({ "aria-expanded": "false" });
        } else {
          that.attr({ "aria-expanded": "true" });
        }
      }
      //nivel 2
      if (that.attr("data-level") == 2) {
        parent.toggleClass("has-focus has-active");
        that.closest(".js-submenu").addClass("has-hidden");

        if (!parent.hasClass("has-active")) {
          that.attr({ "aria-expanded": "false" });
        } else {
          that.attr({ "aria-expanded": "true" });
        }
      }

      if (parent.hasClass("is-current")) {
        parent
          .siblings()
          .find(".has-focus.has-active")
          .removeClass("has-focus has-active");
        parent
          .siblings()
          .find(".js-subLink")
          .attr({ "aria-expanded": "false" });
        $("body").addClass("has-filter");
      } else {
        parent
          .find(".has-focus.has-active")
          .removeClass("has-focus has-active");
        $("body").removeClass("has-filter");
      }

      if (parent.hasClass("has-focus")) {
        parent.siblings().removeClass("has-focus has-active");
        parent
          .siblings()
          .find(".js-subLink")
          .attr({ "aria-expanded": "false" });
      }
      //ajustara y alineara el submenu dependiendo del link que se clickeo
      resizeMarginSubmenu(that);
    });

    //Scroll para agregar/quitar clase en el header
    $(document).on("scroll", function (e) {
      if ($(document).scrollTop() > 50) {
        $(".js-header").addClass("has-scroll");
      } else {
        $(".js-header").removeClass("has-scroll");
      }
    });
    $(document).trigger("scroll");
  };
  /**
   * @description ajustara y alineara el submenu con estilos
   * */
  const resizeMarginSubmenu = (that) => {
    console.log(that);
    if ($(window).width() >= 1000) {
      $(".js-submenuList").css("margin-left", that.position().left - 20);
    } else {
      $(".js-submenuList").css("margin-left", "auto");
    }
  };
  /**
   * @description Funcion del buscador del header
   * */
  const headerSearch = () => {
    //boton que abre el buscador, sea mobile o desktop
    $(".js-btnSearch").on("click", function (e) {
      e.preventDefault();

      $(this).attr({ "aria-expanded": "true" });

      $(".js-headerSearch")
        .addClass("is-visible")
        .attr({ "aria-hidden": "false" });

      if ($(".js-header").hasClass("is-open")) {
        $(".js-menuClose").trigger("click");
      }
    });

    //boton de cancelar del buscador
    $(".js-closeSearch").on("click", function (e) {
      e.preventDefault();
      $(".js-btnSearch").attr({ "aria-expanded": "false" });

      $(".js-headerSearch")
        .removeClass("is-visible")
        .attr({ "aria-hidden": "true" });
    });
  };
  /**
   * @description Slider que se usa en las card de blog
   * */
  const sliderBlogCard = () => {
    let splide = new Splide(".js-sliderBlog", {
      gap: 24,
      padding: "20px",
      autoWidth: true,
      lazyLoad: "sequential",
      mediaQuery: "min",
      perPage: 3,
      arrows: false,
      focus: 0,
      omitEnd: true,
    });
    splide.mount();
  };

  /**
   * @description Funcion de tabs
   * */
  const tabsController = () => {
    let that;

    let tabBtn = $(".js-tabsBtn");

    tabBtn.on("click", function (e) {
      e.preventDefault();
      that = $(this);

      let parent = that.parent(),
        controls = that.attr("aria-controls"),
        text = that.text();

      parent
        .addClass("is-active")
        .find(tabBtn)
        .attr({ "aria-selected": "true", tabindex: "0" });

      parent
        .siblings()
        .removeClass("is-active")
        .find(tabBtn)
        .attr({ "aria-selected": "false", tabindex: "-1" });

      $(".js-tabsPanel").removeClass("is-active");
      $("#" + controls).addClass("is-active");

      $(".js-tabsPanel")
        .find(".js-tabsLink")
        .find(tabBtn)
        .attr({ "aria-expanded": "false" });

      if ($(".js-tabsPanel").hasClass("is-active")) {
        $(".js-tabsPanel.is-active")
          .find(".js-tabsLink")
          .find(tabBtn)
          .attr({ "aria-expanded": "true" });
      }
    });

    $(".js-tabsLink").on("click", function (e) {
      e.preventDefault();
      let id = $(this).attr("data-id"),
        parentPanel = $(this).parent(".js-tabsPanel");

      $("#" + id).trigger("click");

      $("body, html").animate(
        { scrollTop: parentPanel.offset().top - 80 },
        800
      );

      $(this).attr({ "aria-expanded": "true" });
    });

    tabsKey(tabBtn);
  };

  init();
})(jQuery);

document
  .querySelectorAll(
    ".c-navigation-page__list-section li:not(.container-button)"
  )
  .forEach((item) => {
    item.addEventListener("click", () => {
      // Remover la clase --active de todos los elementos
      document
        .querySelectorAll(
          ".c-navigation-page__list-section li:not(.container-button)"
        )
        .forEach((item) => {
          item.classList.remove("container-anchor--active");
        });

      // Agregar la clase --active al elemento clickeado
      item.classList.add("container-anchor--active");
    });
  });

document.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;

  document
    .querySelectorAll(
      ".c-navigation-page__list-section li:not(.container-button)"
    )
    .forEach((li) => {
      const sectionId = li
        .querySelector("a")
        .getAttribute("href")
        .substring(1);
      const sectionElement = document.getElementById(sectionId);

      if (sectionElement) {
        const sectionTop =
          sectionElement.offsetTop -
          document.querySelector(".c-header").offsetHeight -
          100;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionElement.offsetHeight
        ) {
          document
            .querySelectorAll(
              ".c-navigation-page__list-section li:not(.container-button)"
            )
            .forEach((li) => {
              li.classList.remove("container-anchor--active");
            });

          li.classList.add("container-anchor--active");
        }
      }
    });
});

document
  .querySelectorAll(".c-navigation-page__list-section a")
  .forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerHeight =
          document.querySelector(".c-header").offsetHeight;
        // const headerHeight =
        // 	document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

document.addEventListener("DOMContentLoaded", function () {
  var splides = document.querySelectorAll(".slider-values");
  splides.forEach(function (splide) {
    var instance = new Splide(splide, {
      start: 0,
      perPage: 1,
      omitEnd: true,
      arrows: true,
      lazyLoad: "sequential",
      breakpoints: {
        1257: {
          perPage: 1,
        },
        696: {
          perPage: 1,
        },
        500: {
          arrows: false,
        },
      },
    });
    instance.mount();
  });
});

document
  ?.querySelector(".container-form")
  ?.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    let isValid = true;

    // Clear previous error messages and error classes
    document.querySelectorAll(".error-message").forEach((element) => {
      element.textContent = "";
    });
    document.querySelectorAll(".error").forEach((element) => {
      element.classList.remove("error");
    });

    // Validate insurance type
    const insuranceType = document.getElementById("insurance-type");
    if (insuranceType && !insuranceType.value) {
      document.getElementById("error-insurance-type").textContent =
        "Seleccione un tipo de seguro.";
      insuranceType.classList.add("error");
      isValid = false;
    }

    // Validate full name
    const fullName = document.getElementById("full-name");
    if (fullName && !fullName.value.trim()) {
      document.getElementById("error-full-name").textContent =
        "Ingrese su nombre completo.";
      fullName.classList.add("error");
      isValid = false;
    }

    // Validate business name (Razón social)
    const businessName = document.getElementById("business-name");
    if (businessName && !businessName.value.trim()) {
      document.getElementById("error-business-name").textContent =
        "Ingrese su razón social.";
      businessName.classList.add("error");
      isValid = false;
    }

    // Validate business name (Razón social)
    const codePostal = document.getElementById("code-postal");
    if (codePostal && !codePostal.value.trim()) {
      document.getElementById("error-code-postal").textContent =
        "Ingrese su código postal.";
      codePostal.classList.add("error");
      isValid = false;
    }

    // Validate phone
    const phone = document.getElementById("phone");
    const phonePattern = /^[0-9]+$/;
    if (phone && !phone.value.trim()) {
      document.getElementById("error-phone").textContent =
        "Ingrese su teléfono celular.";
      phone.classList.add("error");
      isValid = false;
    } else if (!phonePattern.test(phone.value)) {
      document.getElementById("error-phone").textContent =
        "Ingrese solo números en el teléfono.";
      phone.classList.add("error");
      isValid = false;
    }

    // Validate email
    const email = document.getElementById("email");
    if (
      (email && !email.value.trim()) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
    ) {
      document.getElementById("error-email").textContent =
        "Ingrese un correo electrónico válido.";
      email.classList.add("error");
      isValid = false;
    }

    // Validate city
    const city = document.getElementById("city");
    if (city && !city.value.trim()) {
      document.getElementById("error-city").textContent =
        "Ingrese su ciudad.";
      city.classList.add("error");
      isValid = false;
    }

    // Validate state
    const state = document.getElementById("state");
    if (state && !state.value) {
      document.getElementById("error-state").textContent =
        "Seleccione un estado.";
      state.classList.add("error");
      isValid = false;
    }

    // Validate name developer (Nombre del desarrollador)
    const nameDeveloper = document.getElementById("name-developer");
    if (nameDeveloper && !nameDeveloper.value.trim()) {
      document.getElementById("error-name-developer").textContent =
        "Ingrese el nombre del desarrollador.";
      nameDeveloper.classList.add("error");
      isValid = false;
    }

    // Validate terms and conditions
    const tyc = document.getElementById("TyC");
    if (tyc && !tyc.checked) {
      document.getElementById("error-TyC").textContent =
        "Debe aceptar los términos y condiciones.";
      tyc.classList.add("error");
      isValid = false;
    }

    // Validate contact method
    const contactMethods = document.querySelectorAll(
      'input[name="contact-method"]:checked'
    );
    if (contactMethods.length === 0) {
      document.getElementById("error-contact-method").textContent =
        "Seleccione al menos un método de contacto.";
      document
        .querySelectorAll('input[name="contact-method"]')
        .forEach((element) => {
          element.classList.add("error");
        });
      isValid = false;
    }

    // Submit form if valid
    if (isValid) {
      this.submit();
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("button.o-btn-arrow");

  buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const buttonId = button.id; // Obtén el ID del botón
      const contentId = buttonId.replace("button-expand", "contenido"); // Deriva el ID del contenido
      const contenido = document.getElementById(contentId); // Selecciona el contenido por su ID

      // Alternar la clase 'active' en el botón y en el contenedor de contenido
      button.classList.toggle("active");
      if (contenido) {
        contenido.classList.toggle("u-visible");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section-change");
  const anchors = document.querySelectorAll("li.container-anchor a");

  function toggleSections(activeId) {
    sections.forEach((section) => {
      section.classList.toggle("u-hidden", section.id !== activeId);
      section.id === activeId ? section.setAttribute("aria-expanded", true) : section.setAttribute("aria-expanded", false);
    });
  }

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      event.preventDefault();

      document
        .querySelector("li.container-anchor--active")
        ?.classList.remove("container-anchor--active");

      if (document.querySelector("#title")) {
        const texts = document.querySelector("#title h1").childNodes;
        texts.forEach((node) => {
          if (node.nodeName === "#text") {
            node.nodeValue = this.getAttribute("text-title")
          }
          if (node.nodeName === "STRONG") {
            if (this.getAttribute("text-subtitle") != "") {
              node.textContent = this.getAttribute("text-subtitle")
              node.classList.remove("u-hidden")
            }
            else {
              node.classList.add("u-hidden");
            }
          }
        })
      }
      this.parentElement.classList.add("container-anchor--active");

      const activeId = this.getAttribute("href").substring(1);
      toggleSections(activeId);

      history.pushState(null, "", `#${activeId}`);
    });
  });

  // Inicializar en la carga de la página
  const activeAnchor = document.querySelector(
    "li.container-anchor--active a"
  );
  if (activeAnchor) {
    toggleSections(activeAnchor.getAttribute("href").substring(1));
  }
});
