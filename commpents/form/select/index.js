// commpents/form/radio/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        checkbox: {
            type: Boolean
        },
        radio: {
            type: Boolean
        },
        title: {
            type: String
        },
        options: {
            type: Array
        },
        value: {
            type: [String, Array]
        },
    },  

    /**
     * 组件的初始数据
     */
    data: {
        formOptionId: '',
        formOptionIds: [],
        formOptionIdSelect: {}
    },

    /**
     * 组件的方法列表
     */
    methods: {
        select(e) {
            this.setData({
                formOptionId: e.currentTarget.dataset.value
            })
            this.triggerEvent('customevent', {value: e.currentTarget.dataset.value})
        },
        selects(e) {
            let val = e.currentTarget.dataset.value
            let list = this.data.formOptionIds
            if (list.indexOf(val) >= 0) {
                list.splice(list.indexOf(val), 1)
            } else {
                list.push(val)
            }
            this.setData({
                formOptionIdSelect: this.data.options.map(e => list.indexOf(e.formOptionId) >= 0),
                formOptionIds: list
            })
            this.triggerEvent('customevent', {value: list})
        }
    },
    lifetimes: {
        attached: function() {
            if (this.data.radio && this.data.value) {
                this.setData({
                    formOptionId: this.data.value
                })
            } else if (this.data.value) {
                this.setData({
                    formOptionIdSelect: this.data.options.map(e => this.data.value.indexOf(e.formOptionId) >= 0),
                    formOptionIds: this.data.value
                })
            }
        },
      },
      attached: function() {
        if (this.data.radio && this.data.value) {
            this.setData({
                formOptionId: this.data.value
            })
        } else if (this.data.value) {
            this.setData({
                formOptionIdSelect: this.data.options.map(e => this.data.value.indexOf(e.formOptionId) >= 0),
                formOptionIds: this.data.value
            })
        }
      },
})
