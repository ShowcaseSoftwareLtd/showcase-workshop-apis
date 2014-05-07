var guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

$(function(){    
    var sc_data = SHOWCASE_DATA();

    //Define Model
    var Quote = Backbone.Model.extend({
        defaults: function() {
            return {
                id: Quotes.nextId(),
                guid: guid(),
                name: "",
                address: "",
                phone: "",
                email: "",
                details: "",
                price: "",
                saved: false,
                active: false
            };
        },
        validate: function (attrs) {
            if (!attrs.name) {
                return 'Please fill name field.';
            }
        },
        save: function() {
            var model = this.clone();
            model.unset("saved", { silent: true });
            model.unset("active", { silent: true });
            model.unset("id", { silent: true });
            
            var modelString = JSON.stringify(model);
            sc_data.put('current-form-data', modelString);
            sc_data.store('current-form-data', modelString);
            this.saved=true;
            this.active=false;
        }
    });
    
    //Model Collection
    var QuoteList = Backbone.Collection.extend({
        model: Quote,    
        comparator: 'id',
        save: function() {
            _.each(this.models, function(model) {
                if(model.get("saved")==false) {
                    model.save();
                }
            });
            var collectionString = JSON.stringify(this);
            sc_data.put('current-quotes', collectionString);
        },
        nextId: function() {
            if (!this.length) return 1;
            return this.last().get("id") + 1;
        },
        fetch: function(options) {
            sc_data.get('current-quotes');
            return this;
        }        
    });
    var Quotes = new QuoteList;
 
    var QuoteDetailsView = Backbone.View.extend({
        el:  "#quote-details",
        initialize: function() {
            this.template = _.template($("#tmpl-quote-details").html());
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        clear: function() {
            this.model.destroy();
        }
    });

    //Model View & event action
    var QuoteView = Backbone.View.extend({
        tagName: 'a',
        attributes : function () {
            return {
              "class" : 'list-group-item',
              "data-id" : this.model.get('id')
            };
        },
        initialize: function() {
            this.template = _.template($("#tmpl-quote-item").html());
        },       
        render: function(){
            this.$el.html( this.template(this.model.toJSON()));
            return this;
        }              
    });

    //Model View & event action
    var QuoteListView = Backbone.View.extend({
        tagName: 'div',
        className: 'list-group',
        events: {
            "click .list-group-item": "renderDetails"
        },
        render: function(){
            this.collection.each(function(quote){
                var quoteView = new QuoteView({ model: quote });
                this.$el.append(quoteView.render().el); // calling render method manually..
            }, this);
            return this; // returning this for chaining..
        },
        clear: function() {
            this.model.destroy();
        },
        renderDetails: function(e) {
            $(".list-group-item").removeClass("active");
            $(e.currentTarget).addClass("active");
            var id = $(e.currentTarget).data("id");
            var clickedQuote = this.collection.get(id);
            var quoteDetails = new QuoteDetailsView({model: clickedQuote});
            return quoteDetails.render();
        }  
    });
    
    //Make Application
    var AppView = Backbone.View.extend({
        el: $("#quote-app"),
        events: {
            "click #submit-quote": "submitQuote"
        },
        initialize: function() {
            this.listenTo(Quotes, "add", this.addOne);
            //this.listenTo(Quotes, "reset", this.addAll);
            this.listenTo(Quotes, "invalid", this.newQuoteError);
            this.listenTo(Quotes, "all", this.render);

            this.quoteListElmt = $("#quote-list");         

            Quotes.fetch();
        },
        render: function() {
            if(Quotes.length==0) {
                $("#quote-list-empty").show();
            } else {
                $("#quote-list-empty").hide();
                this.quoteListView = new QuoteListView({collection: Quotes});
                this.quoteListElmt.html(this.quoteListView.render().el);
            }            
        },
        submitQuote: function() {
            var form = $("#new-quote-form").serializeArray();
            var data = {};
            _.each(form, function(field) {
                data[field.name] = field.value;
            });
            Quotes.add(data, {validate:true}); 
            $("#modal-header").focus();                      
        },
        newQuoteError: function(model, error) {
            $("#new-quote-success").hide();
            $("#new-quote-error").html(error).show();
        },
        addOne: function(addedModel, models, options) {
            Quotes.save();
            if(options.init!=true) {
                $("#new-quote-error").hide(); 
                $("#new-quote-success").show();
                $("#quote-details").html("");
                setTimeout(function() { $("#new-quote-modal").modal("hide"); $("#quote-list").focus(); }, 3000);
            }            
        }

    });

    sc_data.global_get_callback(function(key, value) {
        if ((key == 'current-quotes') && (value)) {
            var obj = JSON.parse(value);
            $.each( obj, function( objKey, objValue ) {  // change input boxes to have values we got
                objValue["active"] = false;
                Quotes.add(objValue, {"init":true});
            });
        }      
    });

    var App = new AppView;


    $('#new-quote-modal').on('hide.bs.modal', function () {
       $('#new-quote-modal .alert').hide();
       $('#new-quote-modal #new-quote-form').trigger('reset');
    })
    
}());