app.controller('appCtrl', ['$scope', '$http', '$q', '$localStorage', (function () {
    function AppCtrl($scope, $http, $q, $localStorage) {
        this.$scope = $scope;
        this.$http = $http;
        this.$q = $q;
        this.$localStorage = $localStorage;
        this.key = '01d326fcd7cd656191014978f0c52fd5';
        this.data = null;
        this.labels = [];
        this.series = ['USD', 'CAD', 'EUR'];
        this.rates = [[],[],[]];
        this.options = {scales: {yAxes: [{id: 'y-axis-1',type: 'linear',display: true,position: 'left'}]}};
        
        this.$scope.offset = function() {
            var rec = document.getElementById('mainDrag').getBoundingClientRect(), bodyElt = document.body;
            
            return {
                top: rec.top + bodyElt.scrollTop,
                left: rec.left + bodyElt.scrollLeft
            }
        };

        this.setChartPos = function(){
            let element = $('.chart-container');
            if (this.$localStorage.size){
                element.height(this.$localStorage.size.height);
                element.width(this.$localStorage.size.width);
            }
            if (this.$localStorage.pos){
                element.offset({ top: this.$localStorage.pos.top, left: this.$localStorage.pos.left });
            }
        }

        this.getWeeklyData = function(){
            let date = new Date();
            
            let promises = [];
            
           for (let i = 0; i < 7; i++){
                let monthDigit = date.getMonth() + 1;
                let month = (monthDigit/10 < 1) ? "0" + monthDigit: monthDigit;
                let day = (date.getDate()/10 < 1) ? "0" + date.getDate(): date.getDate();
                let dateString = `${date.getFullYear()}-${month}-${day}`;
                this.labels.push(dateString);
                date.setDate(date.getDate() - 1);
                promises.push(this.$http.get(`http://data.fixer.io/api/${dateString}?access_key=${this.key}&symbols=USD,CAD,EUR`));
            } 
            this.$q.all(promises).then((res)=>{
                this.data = res.map((item)=> {return {date: item.data.date, rates: item.data.rates}});
                this.data.forEach(item => {
                    this.rates[0].push(item.rates[this.series[0]]);
                    this.rates[1].push(item.rates[this.series[1]]);
                    this.rates[2].push(item.rates[this.series[2]]);
                });
                console.log(this.rates);
            }); 

            
        }
        
        this.setChartPos();
        this.getWeeklyData();
    }
    return AppCtrl;
})()]);