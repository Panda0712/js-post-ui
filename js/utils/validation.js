const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Hàm Validator cho form
// Viết các phương thức cho Validator để validate các input
// Xử lý sự kiện onsubmit của form
// Xử lý onblur và oninput cho input

// Hàm Validator cho form
export function Validator(options) {
  // Object lưu các function test của mỗi input
  var selectorRules = {};

  // Hàm get được thẻ form-group
  function getFormGroup(inputElement) {
    while (inputElement.parentElement) {
      if (inputElement.matches(options.formGroup)) {
        return inputElement;
      } else {
        inputElement = inputElement.parentElement;
      }
    }
  }

  // Hàm validate khi onblur input
  function validate(inputElement, rule) {
    var errorElement = getFormGroup(inputElement).querySelector(
      options.errorMessage
    );
    var errorMessage;

    // Lặp qua tất cả các function test của input
    var rules = selectorRules[rule.selector];
    for (var i = 0; i < rules.length; i++) {
      switch (inputElement.type) {
        case "checkbox":
        case "radio":
          errorMessage = rules[i](
            formElement.querySelector(rule.selector + ":checked")
          );
          break;
        default:
          errorMessage = rules[i](inputElement.value);
      }
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorElement.style.display = "block";
      errorElement.innerText = errorMessage;
    }

    return !!errorMessage;
  }

  // Lấy ra element form của HTML
  var formElement = $(options.form);
  if (formElement) {
    // Lắng nghe sự kiện submit của form
    formElement.onsubmit = function (e) {
      e.preventDefault();

      var isValid = false;
      var countValid = 0;

      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        var inValid = validate(inputElement, rule);
        if (!inValid) {
          countValid++;
        }
        if (countValid === options.rules.length) isValid = true;
      });
      if (isValid) {
        if (typeof options.onSubmit === "function") {
          var formInput = formElement.querySelectorAll("[name]");
          var formValue = Array.from(formInput).reduce(function (
            values,
            input
          ) {
            switch (input.type) {
              case "radio":
                values[input.name] = formElement.querySelector(
                  'input[name="' + input.name + '"]:checked'
                ).value;
                break;
              case "checkbox":
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = [];
                }
                if (input.checked) values[input.name].push(input.value);
                break;
              case "file":
                values[input.name] = input.files;
                break;
              default:
                values[input.name] = input.value;
            }
            return values;
          },
          {});
          options.onSubmit(formValue);
        }
      }
    };

    // Lắng nghe sự kiện blur và oninput của từng input
    options.rules.forEach(function (rule) {
      // Xử lý thêm đủ các test function của mỗi selector
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      var inputElements = formElement.querySelectorAll(rule.selector);
      Array.from(inputElements).forEach(function (inputElement) {
        if (inputElement) {
          inputElement.onblur = function () {
            validate(inputElement, rule);
          };
          inputElement.oninput = function () {
            var errorElement = getFormGroup(inputElement).querySelector(
              options.errorMessage
            );
            errorElement.style.display = "none";
          };
        }
      });
    });
  }
}

// Hàm xử lý validate khi nhập dữ liệu
Validator.isRequiredTitle = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value
        ? undefined
        : message || "Ooops! Please write a nice title for your post &gt;.&lt;";
    },
  };
};

Validator.isRequiredAuthor = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : message || "Please enter author of this post!";
    },
  };
};

// Hàm xử lý số kí tự tối thiểu phải nhập khi nhập password
Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : message || `Please enter at least ${min} characters`;
    },
  };
};
