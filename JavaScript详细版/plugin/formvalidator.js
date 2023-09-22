//表单验证插件
if (!window.myPlugin) {
    window.myPlugin = {};
}

/**
 * 表单验证的构造函数
 * 通过该构造函数，创建一个表单验证对象
 */
window.myPlugin.FormValidator = function (option) {
    //默认配置
    var defaultOption = {
        formDom: document.forms[0], //form元素
        formRule: {}, //表单规则
        errorClass: "field-error" //错误的类名
    };
    this.option = Object.assign({}, defaultOption, option);//混合，形成最终的配置

    //注册各种事件
    var elems = this.getAllElements();
    var that = this;
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        var field = elem.field;
        (function (field) {
            elem.doms.forEach(function (el) {
                //给el元素注册事件
                var name = that.getEventName(el);
                var fields = [field]; //触发事件时，要验证的字段
                var configName = myPlugin.FormValidator.dataConfig.dataFieldTrigger;
                var triggers = el.getAttribute(configName);
                if (triggers) {
                    triggers = triggers.split(",");
                    fields = fields.concat(triggers); //添加上其他的字段
                }
                el.addEventListener(name, function () {
                    that.setStatus.apply(that, fields);
                });
            });
        })(field);
    }
}

/**
 * 获取事件名
 */
myPlugin.FormValidator.prototype.getEventName = function (el) {
    var name = myPlugin.FormValidator.dataConfig.dataFieldListener; //获取自定义属性名
    var eventName = el.getAttribute(name);
    if (!eventName) {
        eventName = myPlugin.FormValidator.dataConfig.dataFieldDefaultListener;
    }
    return eventName;
}

/**
 * 得到所有需要验证的表单元素
 */
myPlugin.FormValidator.prototype.getAllElements = function () {
    var containers = this.getAllContainers();//得到所有的表单容器
    var result = []; //最终的结果
    for (var i = 0; i < containers.length; i++) {
        var con = containers[i];
        var obj = { field: con.getAttribute(myPlugin.FormValidator.dataConfig.fieldContainer) };
        obj.doms = this.getFieldElements(con);
        result.push(obj);
    }
    return result;
}

/**
 * 得到一个表单字段的数据，如果没有拿到任何表单数据，则返回null
 * @param {string} field 表单字段名
 */
myPlugin.FormValidator.prototype.getFieldData = function (field) {
    //寻找表单字段容器
    var fieldContainer = this.getFieldContainer(field);
    if (!fieldContainer) {
        return;
    }
    var eles = this.getFieldElements(fieldContainer); //要验证的表单元素
    var datas = []; //数据数组
    eles.forEach(function (element) {
        var propName = myPlugin.FormValidator.dataConfig.dataFieldProp; //得到自定义属性名
        propName = element.getAttribute(propName);
        if (!propName) {
            propName = myPlugin.FormValidator.dataConfig.dataFieldDefaultProp; //使用默认属性名
        }
        var val = element[propName]; //通过元素的属性名，取出属性值
        //单独处理单选和复选的情况
        if (element.type === "checkbox" || element.type === "radio") {
            if (element.checked) {
                datas.push(val);
            }
        }
        else {
            datas.push(val);
        }
    });
    if (datas.length === 0) {
        return null;
    }
    if (eles.length === 1) {
        return datas[0]; //只有一个表单元素的情况
    }
    return datas;
}

/**
 * 得到整个表单数据
 */
myPlugin.FormValidator.prototype.getFormData = function () {
    var dataName = myPlugin.FormValidator.dataConfig.fieldContainer;
    containers = this.getAllContainers();
    var that = this;
    var formData = {};
    containers.forEach(function (con) {
        var field = con.getAttribute(dataName); //字段名
        var data = that.getFieldData(field);  //字段值
        formData[field] = data;
    })
    return formData;
}

/**
 * 得到所有的表单容器
 */
myPlugin.FormValidator.prototype.getAllContainers = function () {
    //拿到所有的表单域容器
    var containers = this.option.formDom.querySelectorAll(`[${myPlugin.FormValidator.dataConfig.fieldContainer}]`);
    return Array.from(containers);
}

/**
 * 得到一个表单字段容器
 * @param {string} field 表单字段名
 */
myPlugin.FormValidator.prototype.getFieldContainer = function (field) {
    return this.option.formDom.querySelector(`[${myPlugin.FormValidator.dataConfig.fieldContainer}="${field}"]`);
}

/**
 * 得到表单字段元素
 * @param {object} fieldContainer 表单域容器
 */
myPlugin.FormValidator.prototype.getFieldElements = function (fieldContainer) {
    var eles = fieldContainer.querySelectorAll(`[${myPlugin.FormValidator.dataConfig.dataField}]`);
    return Array.from(eles);
}


//验证

/**
 * 验证一个数据
 * @param {*} data 要验证的数据
 * @param {object} ruleObj 验证规则对象
 * @param {object} formData 整个表单数据
 * @returns 返回验证结果，如果验证通过，返回true，如果没有通过，返回一个错误的信息
 */
myPlugin.FormValidator.prototype.validateData = function (data, ruleObj, formData) {
    //data：null、普通数据、数组
    if (typeof ruleObj.rule === "string") {
        //规则为预设值
        var func = myPlugin.FormValidator.validators[ruleObj.rule];
        if (!func) {
            //预设值无效
            throw new TypeError("验证规则不正确");
        }
        if (func(data, formData)) {
            return true;
        }
        return ruleObj.message;
    }
    else if (ruleObj.rule instanceof RegExp) {
        if (data === null) {
            return ruleObj.message;
        }
        //规则为正则
        if (ruleObj.rule.test(data)) {
            return true;
        }
        return ruleObj.message;
    }
    else if (typeof ruleObj.rule === "function") {
        //自定义函数
        return ruleObj.rule(data, formData);
    }
    throw new TypeError("验证规则不正确");
}

/**
 * 验证某个字段，返回一个验证结果，如果验证通过，返回true，如果验证没有通过，返回验证信息
 * 验证信息：字段名、数据、规则对象、错误消息
 */
myPlugin.FormValidator.prototype.validateField = function (field, formData) {
    var data = formData[field]; //要验证的数据
    var ruleObjs = this.option.formRule[field]; //验证规则数组
    if (!ruleObjs) {
        return true;
    }
    for (var i = 0; i < ruleObjs.length; i++) {
        var ruleObj = ruleObjs[i];
        var result = this.validateData(data, ruleObj, formData);
        if (result !== true) {
            //有错误，result是错误信息
            return { //验证错误的各种信息
                field,
                data,
                ruleObj,
                message: result
            }
        }
    }
    return true;
}

/**
 * 验证表单，得到验证结果
 */
myPlugin.FormValidator.prototype.validate = function () {
    var formData = this.getFormData(); //得到所有的表单数据
    if (arguments.length === 0) {
        var fields = Object.getOwnPropertyNames(formData); //得到所有表单域名称
    }
    else {
        var fields = Array.from(arguments);
    }
    var that = this;
    var results = fields.map(function (field) {
        return that.validateField(field, formData);
    }).filter(function (item) {
        return item !== true;
    });
    return results;
}

/**
 * 设置某个表单项的状态
 * @param {*} validateResult 该表单项的错误信息，如果是undefined，表示没有错误
 * @param {*} field 验证的表单项的名称
 */
myPlugin.FormValidator.prototype.setFieldStatus = function (validateResult, field) {
    var fieldContainer = this.getFieldContainer(field); //表单字段容器
    var errorEle = fieldContainer.querySelector(`[${myPlugin.FormValidator.dataConfig.dataFieldError}]`); //错误消息的元素
    if (!errorEle) {
        errorEle = fieldContainer.querySelector(`.${myPlugin.FormValidator.dataConfig.dataFieldDefaultError}`);
    }
    if (validateResult) {
        //有错误
        if (errorEle) {
            errorEle.innerHTML = validateResult.message;
        }
        fieldContainer.classList.add(this.option.errorClass);
    }
    else {
        //无错误
        fieldContainer.classList.remove(this.option.errorClass);
        if (errorEle) {
            errorEle.innerHTML = "";
        }
    }
}

/**
 * 设置整个表单的状态
 * 无参：整个表单
 * 有参：根据参数设置具体的表单项
 */
myPlugin.FormValidator.prototype.setStatus = function () {
    if (arguments.length === 0) {
        var formData = this.getFormData();
        var fields = Object.getOwnPropertyNames(formData); //拿到表单中的所有字段
    }
    else {
        var fields = Array.from(arguments); //字段来自于参数的传递
    }
    var results = this.validate.apply(this, fields);
    var that = this;
    fields.forEach(function (field) {
        var res = results.find(function (item) {
            return item.field === field;
        }); //从验证结果中，寻找某个字段的验证结果，没有找到，自然为undefined
        that.setFieldStatus(res, field);
    })
    return results;
}

/**
 * 自定义属性的名字
 */
myPlugin.FormValidator.dataConfig = {
    fieldContainer: "data-field-container", //表单字段容器的自定义属性名
    dataField: "data-field", //表单字段的自定义属性名
    dataFieldProp: "data-field-prop", //要验证的表单字段的属性名
    dataFieldDefaultProp: "value", //要验证的表单字段默认的属性名
    dataFieldListener: "data-field-listener", //要监听的事件的自定义属性名
    dataFieldDefaultListener: "change", //要监听的默认事件
    dataFieldTrigger: "data-field-trigger", //要额外触发的验证字段
    // 这个属性没意义了 dataFieldDefaultTrigger: "", //要额外触发的验证字段的默认值（不触发）
    dataFieldError: "data-field-error", //错误消息的元素
    dataFieldDefaultError: "error" //错误消息的默认元素的类名
}
/**
 * 预设的验证规则，通过返回true，没有通过返回false
 */
myPlugin.FormValidator.validators = {
    required: function (data) { //非空验证
        if (!data) {
            return false;
        }
        if (Array.isArray(data) && data.length === 0) {
            return false;
        }
        return true;
    },
    mail: function (data) {
        if (data === null) {
            return false;
        }
        var reg = /^\w+@\w+(\.\w+){1,2}$/;
        return reg.test(data);
    },
    number: function (data) {
        var reg = /^\d+(\.\d+)?$/;
        return reg.test(data);
    }
}
