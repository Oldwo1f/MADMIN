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

app.config(function(tagsInputConfigProvider) {
  tagsInputConfigProvider
    .setDefaults('tagsInput', {
      placeholder: 'Nouveau tag',
      minLength: 2,
      addOnEnter: true
    })
    .setDefaults('autoComplete', {
      debounceDelay: 200,
      loadOnDownArrow: true,
      loadOnEmpty: true
    })
});