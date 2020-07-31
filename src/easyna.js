class EasyNA {
  constructor(ids) {
    var obj = this;
    this.instances = new Array();
    this.fired = 0;

    for (let counter = 0; counter < ids.length; counter++) {
      this.instances[counter] = new Object();
      this.instances[counter].element = document.getElementById(ids[counter]);
      this.instances[counter].current_number = 0;
      this.instances[counter].number = parseInt(this.instances[counter].element.textContent.replace(/,/g, ''));
      this.instances[counter].fired = false;
      this.instances[counter].element.innerHTML = "0";
    }

    EasyNA.fire_elements(obj);
    window.addEventListener("scroll", function() {
      EasyNA.fire_elements(obj);
    });
  }

  // var this = this;
  static fire_elements(obj) {
    let instances_len = obj.instances.length;
    if (obj.fired == instances_len) return;

    for (let counter = 0; counter < instances_len; counter++) {
      if (
        obj.instances[counter].fired == false &&
        EasyNA.is_in_viewport(obj.instances[counter].element)
      ) {
        EasyNA.start_animation(obj.instances[counter]);
        obj.instances[counter].fired = true;
        obj.fired++;
      }
    }
  }

  static is_in_viewport(element) {
    let obj = element.getBoundingClientRect();
    return (
      obj.top >= 0 &&
      obj.left >= 0 &&
      obj.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      obj.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  static start_animation(instance) {
    let
      updates = 100, // Amount of updates in te given time_s.
      frame = 0,
      time_s = (Math.round(Math.random() * 1000)) + 500, // Time it will take for the animation between 1 and 4 in seconds.
      delay = Math.random() * 300, // Delay to start animation.
      increasing_value = instance.number / updates,
      interval_var;

    setTimeout(() => {
      interval_var = setInterval(() => {
        instance.current_number += increasing_value;
        instance.element.innerHTML = instance.current_number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        frame++;

        if (frame == updates) {
          instance.element.innerHTML = instance.number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          clearInterval(interval_var);
        }
      }, time_s / updates);
    }, delay);
  }

  static test() {
    console.log("EasyNA is connected and working!");
  }
}
