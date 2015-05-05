app.config(['ngFabFormProvider', function (ngFabFormProvider)
    {
        ngFabFormProvider.extendConfig({
            scrollToAndFocusFirstErrorOnSubmit: true,
            // setNovalidate: false,
            // preventInvalidSubmit: true,
            validationsTemplate: 'templates/backoffice/global/validation.html',
        });
    }]);
app.config(['datepickerConfig', 'datepickerPopupConfig', function(datepickerConfig, datepickerPopupConfig) {   
    datepickerConfig.startingDay = 1;
    datepickerConfig.showWeeks = false;
    
    datepickerPopupConfig.showButtonBar = false;
    datepickerPopupConfig.datepickerPopup = "dd/MM/yyyy";
    
}]);
app.config(function (minicolorsProvider) {
    angular.extend(minicolorsProvider.defaults, {
      control: 'hue',
      position: 'bottom left',
      theme: 'bootstrap'
    });
  });
app.config(['tagsInputConfigProvider', function(tagsInputConfigProvider) {
  tagsInputConfigProvider
    .setDefaults('tagsInput', {
      placeholder: 'Ajouter un tag',
      minLength: 2,
      addOnEnter: false
    })
    .setDefaults('autoComplete', {
      debounceDelay: 200,
      loadOnDownArrow: true,
      loadOnEmpty: true,
      minLength:2
    })
}]);