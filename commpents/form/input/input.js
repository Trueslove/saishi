// commpents/form/input/input.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        placeholder: {
            type: String,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        maxWordLimit: {
            type: Number
        },
        tips: {
            type: String
        },
        type: {
            type: String
        },
        value: {
            type: String
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeInput(e) {
            this.triggerEvent('customevent', {value: e.detail.value})
        }
    }
})
