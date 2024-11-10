class Api {
    _baseUrl;
    _apiKey;
  constructor(url, apiKey) {
    this._baseUrl = url;
    this._apiKey = apiKey;
  }
  _checkResponse(res) {
    return res.ok
      ? res.json()
      : res.json().then((err) => Promise.reject(err));
  }

  getCertificates() {
    return fetch(
      `${this._baseUrl}?MethodName=OSGetGoodList&ismob=0&ApiKey=${this._apiKey}`
    ).then(this._checkResponse)
  }
  purchaseCertificate(data) {
    return fetch(`${this._baseUrl}`, {
      method: 'POST',
      body: JSON.stringify({
        "ApiKey": this._apiKey,
        "methodName": "OSSale",
        "IsTestMode": "1",
        "Id": data.ID,
        "TableName": data.TABLENAME,
        "PrimaryKey": data.PRIMARYKEY,
        "Price": data.PRICE,
        "Summa": data.SUMMA,
        "ClientName": data.fullname,
        "Phone": data.phone,
        "Email": data.email,
        "PaymentTypeId": 2,
        "UseDelivery": 0,
        "MSGText": data.message,
        "PName": "",
        "PPhone": "",
        "IsGift": 0
    })
    })
    
  }
};


export const apiService = new Api(
  "https://sycret.ru/service/api/api",
  "011ba11bdcad4fa396660c2ec447ef14"
);
