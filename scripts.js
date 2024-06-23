class currencyConverter {

    static DOLLAR_ABBREVIATION = 'USD';
    static DOLLAR_SYMBOL       = 'US$';
    static DOLLAR_VALUE        = 4.87;

    static EURO_ABBREVIATION   = 'EUR';
    static EURO_SYMBOL         = '€';
    static EURO_VALUE          = 5.32;

    static POUND_ABBREVIATION  = 'GBP';
    static POUND_SYMBOL        = '£';
    static POUND_VALUE         = 6.08;

    static processOnLoading() {
        this.handleEvents();
    }

    static handleEvents() {
        this.handleFormEvent();
        this.handleFieldsEvent();
    }

    static handleFormEvent() {
        this.onSubmitForm();
    }

    static onSubmitForm() {
        this.getFormElement().onsubmit = (event) => {
            event.preventDefault();
            this.convertCurrency(this.getAmountField().value, this.getCurrencyField().value)
        };
    }

    static convertCurrency(iAmountValue, sCurrency) {
        try {
            const aMessages = this.validateData(iAmountValue, sCurrency);

            if(aMessages.length) {
                throw new Error(aMessages);
            }

            const iCurrencyValue  = this.getCurrencyValue(sCurrency);
            const sCurrencySymbol = this.getCurrencySymbol(sCurrency);

            this.setDescriptionContent(this.getStringDescriptionDefault(sCurrencySymbol, iCurrencyValue));
            this.setResultContent(this.formatCurrencyBRL(iAmountValue * iCurrencyValue));

            this.showResult();
        }
        catch(Error) {
            this.hideResult();
            this.showAlert(Error);
        }
    }

    static validateData(iAmountValue, sCurrency) {
        const aMessages = [];

        if(!iAmountValue) {
            aMessages.push('O campo VALOR é obrigatório.');
        }
        else if(!sCurrency) {
            aMessages.push('O campo MOEDA é obrigatório.');
        }

        return aMessages;
    }

    static getCurrencyValue(sCurrency) {
        const aValue = {
            [this.DOLLAR_ABBREVIATION] : this.DOLLAR_VALUE,
            [this.EURO_ABBREVIATION]   : this.EURO_VALUE,
            [this.POUND_ABBREVIATION]  : this.POUND_VALUE
        };

        return aValue[sCurrency];
    }

    static getCurrencySymbol(sCurrency) {
        const aSymbol = {
            [this.DOLLAR_ABBREVIATION] : this.DOLLAR_SYMBOL,
            [this.EURO_ABBREVIATION]   : this.EURO_SYMBOL,
            [this.POUND_ABBREVIATION]  : this.POUND_SYMBOL
        };
        
        return aSymbol[sCurrency];
    }

    static handleFieldsEvent() {
        this.handleAmountEvent();
    }

    static handleAmountEvent() {
        this.onInputAmountField();
    }

    static onInputAmountField() {
        this.getAmountField().addEventListener('input', () => {
            this.setAmountValue(this.getAmountValue().replace(/\D+/g, ''));
        });
    }

    static getFormElement() {
        return document.querySelector('form');
    }

    static getAmountField() {
        return document.querySelector('#amount');
    }

    static getAmountValue() {
        return this.getAmountField().value;
    }

    static setAmountValue(iValue) {
        this.getAmountField().value = iValue;
    }

    static getCurrencyField() {
        return document.querySelector('#currency');
    }

    static getFooterElement() {
        return document.querySelector('main footer');
    }

    static getDescriptionElement() {
        return document.querySelector('#description');
    }

    static setDescriptionContent(iValue) {
        this.getDescriptionElement().textContent = iValue;
    }

    static getResultElement() {
        return document.querySelector('#result');
    }

    static setResultContent(iValue) {
        this.getResultElement().textContent = iValue;
    }

    static showResult() {
        this.getFooterElement().classList.add('show-result');
    }

    static hideResult() {
        this.getFooterElement().classList.remove('show-result');
    }

    static showAlert(sMessage) {
        return alert(sMessage);
    }

    static getStringDescriptionDefault(sCurrencySymbol, iCurrencyValue) {
        return `${sCurrencySymbol} 1 = ${this.formatCurrencyBRL(iCurrencyValue)}`;
    }

    static formatCurrencyBRL(iValue) {
        return Number(iValue).toLocaleString('pt-BR', {
            style    : 'currency',
            currency : 'BRL'
        });
    }

}

currencyConverter.processOnLoading();