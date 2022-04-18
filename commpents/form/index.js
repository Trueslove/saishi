// commpents/form/group/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        formList: {
            type: Array
        },
        formData: {
            type: Object
        },
        valueKey: {
            type: String
        }
    },
    observers: {
    },
    /**
     * 组件的初始数据
     */
    data: {
        region: ['广东省', '广州市', '海珠区'],
    },
    /**
     * 组件的方法列表
     */
    methods: {
        changeInput(e) {
            let { value } = e.detail;
            let { key } = e.target.dataset;
            let targetKey = `formData.${key}`
            this.setData({
                [targetKey]: value
            })
            this.triggerEvent('changeForm', this.properties.formData);
        },
        changeSelector(e) {
            let { value } = e.detail;
            let { key, item } = e.target.dataset;
            let targetKey = `formData.${key}`
            this.setData({
                [targetKey]: item[value].optionText
            })
            this.triggerEvent('changeForm', this.properties.formData);
        },
        bindRegionChange(e) {
            console.log('picker发送选择改变，携带值为', e.detail.value)
            this.setData({
              region: e.detail.value
            })
          }
    }
})
