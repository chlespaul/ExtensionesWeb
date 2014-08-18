/* ========================================================================
 * Copyright 2014 olorcito
 *
 * Licensed under the MIT, The MIT License (MIT)
 * Copyright (c) 2014 olorcito

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 * ========================================================================


Source generated by CrudMaker version 1.0.0.201408112050

*/
define(['model/recordModel'], function(recordModel) {
    App.Controller._RecordController = Backbone.View.extend({
        initialize: function(options) {
            this.modelClass = options.modelClass;
            this.listModelClass = options.listModelClass;
            this.showEdit = true;
            this.showDelete = true;
            this.editTemplate = _.template($('#record').html());
            this.listTemplate = _.template($('#recordList').html());
            if (!options || !options.componentId) {
                this.componentId = _.random(0, 100) + "";
            }else{
				this.componentId = options.componentId;
		    }
            var self = this;
            if(self.postInit){
            	self.postInit(options);
            }
        },
        create: function() {
            if (App.Utils.eventExists(this.componentId + '-' +'instead-record-create')) {
                Backbone.trigger(this.componentId + '-' + 'instead-record-create', {view: this});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-record-create', {view: this});
                this.currentRecordModel = new this.modelClass({componentId: this.componentId});
                this._renderEdit();
                Backbone.trigger(this.componentId + '-' + 'post-record-create', {view: this});
            }
        },
        list: function(params) {
            if (params) {
                var data = params.data;
            }
            if (App.Utils.eventExists(this.componentId + '-' +'instead-record-list')) {
                Backbone.trigger(this.componentId + '-' + 'instead-record-list', {view: this, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-record-list', {view: this, data: data});
                var self = this;
				if(!this.recordModelList){
                 this.recordModelList = new this.listModelClass();
				}
                this.recordModelList.fetch({
                    data: data,
                    success: function() {
                        self._renderList();
                        Backbone.trigger(self.componentId + '-' + 'post-record-list', {view: self});
                    },
                    error: function(mode, error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'record-list', view: self, error: error});
                    }
                });
            }
        },
        edit: function(params) {
            var id = params.id;
            var data = params.data;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-record-edit')) {
                Backbone.trigger(this.componentId + '-' + 'instead-record-edit', {view: this, id: id, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-record-edit', {view: this, id: id, data: data});
                if (this.recordModelList) {
                    this.currentRecordModel = this.recordModelList.get(id);
                    this.currentRecordModel.set('componentId',this.componentId); 
                    this._renderEdit();
                    Backbone.trigger(this.componentId + '-' + 'post-record-edit', {view: this, id: id, data: data});
                } else {
                    var self = this;
                    this.currentRecordModel = new this.modelClass({id: id});
                    this.currentRecordModel.fetch({
                        data: data,
                        success: function() {
                            self.currentRecordModel.set('componentId',self.componentId); 
                            self._renderEdit();
                            Backbone.trigger(self.componentId + '-' + 'post-record-edit', {view: this, id: id, data: data});
                        },
                        error: function() {
                            Backbone.trigger(self.componentId + '-' + 'error', {event: 'record-edit', view: self, id: id, data: data, error: error});
                        }
                    });
                }
            }
        },
        destroy: function(params) {
            var id = params.id;
            var self = this;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-record-delete')) {
                Backbone.trigger(this.componentId + '-' + 'instead-record-delete', {view: this, id: id});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-record-delete', {view: this, id: id});
                var deleteModel;
                if (this.recordModelList) {
                    deleteModel = this.recordModelList.get(id);
                } else {
                    deleteModel = new this.modelClass({id: id});
                }
                deleteModel.destroy({
                    success: function() {
                        Backbone.trigger(self.componentId + '-' + 'post-record-delete', {view: self, model: deleteModel});
                    },
                    error: function() {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'record-delete', view: self, error: error});
                    }
                });
            }
        },
		_loadRequiredComponentsData: function(callBack) {
            var self = this;
            var listReady = _.after(1, function(){
                callBack();
            }); 
            var listDataReady = function(componentName, model, aliasModel){
            if(aliasModel){
                self[aliasModel] = model;
            } else {
            	self[componentName] = model;
            }    
                listReady();
            };
				App.Utils.getComponentList('measureUnitComponent',listDataReady,'measureUnitComponent');
        },
        save: function() {
            var self = this;
            var model = $('#' + this.componentId + '-recordForm').serializeObject();
            if (App.Utils.eventExists(this.componentId + '-' +'instead-record-save')) {
                Backbone.trigger(this.componentId + '-' + 'instead-record-save', {view: this, model : model});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-record-save', {view: this, model : model});
                this.currentRecordModel.set(model);
                this.currentRecordModel.save({},
                        {
                            success: function(model) {
                                Backbone.trigger(self.componentId + '-' + 'post-record-save', {model: self.currentRecordModel});
                            },
                            error: function(error) {
                                Backbone.trigger(self.componentId + '-' + 'error', {event: 'record-save', view: self, error: error});
                            }
                        });
            }
        },
        _renderList: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.listTemplate({records: self.recordModelList.models, componentId: self.componentId, showEdit : self.showEdit , showDelete : self.showDelete}));
                self.$el.slideDown("fast");
            });
        },
        _renderEdit: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.editTemplate({record: self.currentRecordModel, componentId: self.componentId , showEdit : self.showEdit , showDelete : self.showDelete
 
				    ,measureUnit: self.measureUnitComponent
 
				}));
                self.$el.slideDown("fast");
            });
        }
    });
    return App.Controller._RecordController;
});