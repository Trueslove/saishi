// commpents/popup/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        width: {
            type: String
        },
        show: {
            type: Boolean
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
        close(e) {
            this.triggerEvent('close', false)
        }
    }
})