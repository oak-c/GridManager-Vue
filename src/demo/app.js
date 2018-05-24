var colData = [
    {
        key: 'name',
        remind: 'the name',
        width: '100px',
        text: '名称',
        sorting: ''
    },{
        key: 'info',
        remind: 'the info',
        width: '200px',
        text: '使用说明'
    },{
        key: 'url',
        remind: 'the url',
        text: 'url'
    },{
        key: 'createDate',
        remind: 'the createDate',
        width: '100px',
        text: '创建时间',
        sorting: 'DESC',
        template: function(createDate, rowObject){
            return new Date(createDate);
        }
    },{
        key: 'lastDate',
        remind: 'the lastDate',
        width: '100px',
        text: '最后修改时间',
        sorting: '',
        template: function(lastDate, rowObject){
            return new Date(lastDate).toLocaleDateString();
        }
    },{
        key: 'action',
        remind: 'the action',
        width: '100px',
        text: '操作',
        // template: Vue.compile('<span class="plugin-action edit-action" gm-click="app.$options.testGM">删除</span>')
        template: (action, rowObject) => {
            return '<span class="plugin-action edit-action" gm-click="testGM">删除</span>';
        }
    }];

var app = new Vue({
    el: '#app',
    data: {
        // 表单数据
        formData: {
            name: '',
            info: '',
            url: ''
        },

        // 初始化按纽禁用标识
        initDisabled: true,

        // 销毁按纽禁用标识
        destroyDisabled: true,

        // GM所需参数
        option: {
            gridManagerName: "testVue",
            // height: document.documentElement.clientHeight + 'px', // 全屏
            height: '400px',
            columnData: colData,
            supportRemind: true,
            isCombSorting:  true,
            supportAjaxPage: true,
            supportSorting: true,
            ajax_url: "http://www.lovejavascript.com/learnLinkManager/getLearnLinkList",
            ajax_type: "POST",
            query: {pluginId: 1},
            pageSize: 20
        }
    },
    methods: {
        // 测试vue下的GM事件
        testGM: function(row) {
            if(window.confirm('确认要删除['+row.name+']?')){
                console.log('----删除操作开始----');
                this.$refs['grid'].$el.GM('refreshGrid');
                console.log('数据没变是正常的, 因为这只是个示例,并不会真实删除数据.');
                console.log('----删除操作完成----');
            }
        },

        // 事件: 搜索
        onSearch: function() {
            var params = Object.assign({cPage: 1}, this.formData);
            this.$refs['grid'].$el.GM('setQuery', params, function(){
                console.log('setQuery执行成功');
            });
        },

        // 事件: 重置
        onReset: function() {
            this.formData.name = '';
            this.formData.info = '';
            this.formData.url = '';
        },

        // 事件: 初始化
        onInit: function() {
            this.$refs['grid'].$el.GM('init', this.option);
            this.initDisabled = true;
            this.destroyDisabled = false;
        },

        // 事件: 销毁
        onDestroy: function() {
            this.$refs['grid'].$el.GM('destroy');
            this.initDisabled = false;
            this.destroyDisabled = true;
        }
    },

    // 创建完成
    created: function(){
        this.initDisabled = true;
        this.destroyDisabled = false;
    }
});
