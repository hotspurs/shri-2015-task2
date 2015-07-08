/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'},
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };
 
    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }
 
        callback(null, result);
    }, Math.round(Math.random * 1000));
}
/**
 * Ваши изменения ниже
 */
 
(function(){
    var requests = ['/countries', '/cities', '/populations'],
        requestsLength = requests.length;
    var responses = {};

    for (i = 0; i < requestsLength; i++) {

        (function(request){

            var callback = function (error, result) {
                responses[request] = result;

                var l = [];
                for (K in responses)
                  l.push(K);
                  
            
                if (l.length == requestsLength) {

                    var c = [], cc = [], p = 0;
                    for (i = 0; i < responses['/countries'].length; i++) {
                        if (responses['/countries'][i].continent === 'Africa') {
                            c.push(responses['/countries'][i].name);
                        }
                    }
         
                    for (i = 0; i < responses['/cities'].length; i++) {
                        for (j = 0; j < c.length; j++) {
                            if (responses['/cities'][i].country === c[j]) {
                                cc.push(responses['/cities'][i].name);
                            }
                        }
                    }
                    
                    for (i = 0; i < responses['/populations'].length; i++) {
                        for (j = 0; j < cc.length; j++) {
                            if (responses['/populations'][i].name === cc[j]) {
                                p += responses['/populations'][i].count;
                            }
                        }
                    }

                    console.log('Total population in African cities: ' + p);
                }
            };
            getData(request, callback);

        })(requests[i]);
        /*
           Проблема заключалась в переменной request. Она была объявлена глобально
           и на момент вызовов функции callback она имела значение, которое её было
           присвоено в последней итерации цикла.

           Решение: надо прокинуть для каждого вызова функции свое значение переменной request,
           для этого обернем код цикла в немедленно вызываемую функцию, тем самым сохраним переменную 
           в замыкании.

           В javascript функции являются объектами.Как еще один вариант можно было свойству 
           callback.request присвоить значение request[i] и уже внутри функции обращаться к этому свойству.
        */
    }
    //todo
    /*
    1 Пункт
    1)Возможно ли оптимизировать код.
    2) ...

    2 Пункт
    1) Написать код взаимодействия с пользователем более модульней = )
    2) Вместо alert, prompt  сделать нормальные popup'ы
    3) Придумать что делать с недостающии городами - возможно парнить wiki и отдавать инфу.
    4) Спрашивать на входе вы хотите узнать про город или страну?
    
    Общие
    Собирать все в один js файл.

    */

    var button = document.getElementsByClassName('button')[0];

    App.utils.on(button, 'click', function(){
    var data = prompt('Введите страну или город из списка на латинице', ''),
        found = false;
    if( !(data === null || data === '' )){
        for(var i = 0, countriesLength = responses['/cities'].length; i < countriesLength; i++){
           for( var k in responses['/cities'][i]){
              if( (data === responses['/cities'][i][k]) && k === 'name' ){
                alert('Population in '+ data + ' '+ responses['/populations'][i]['count'] );
                found = true;
              }
           }
        }

        if(!found){
            var requestAPI = App.utils.getXMLHttpRequest();
            requestAPI.open('GET', 'https://restcountries.eu/rest/v1/name/'+data , true);
            requestAPI.onreadystatechange = function(){
               if(requestAPI.readyState != 4) return;
               var dataFromAPI = JSON.parse(requestAPI.responseText)
               if(dataFromAPI.status!= 404){
                 alert('Population in ' +data + ': '+ dataFromAPI[0].population );
               }
               else{
                 alert('Ошибка : '+dataFromAPI.status+' - '+dataFromAPI.message);
               }

            }
            requestAPI.send(null);

        }

    }else{
        console.log('Вы не чего не ввели');
    }


    });
})();