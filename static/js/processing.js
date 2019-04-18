var nJobs = 1;

function process(seq, family, nClasses, K){

	$.ajax({url:`/njobs?family=${family}&nClasses=${nClasses}&K=${K}&nJobs=${nJobs}`, type: 'GET', crossDomain: true, success:function(data, status){
									        
        console.log(data);

        var start = 0;
        var joined = 0;

        var d = new Date();
        var n = d.getTime();

        var results = [];

        var done = 0;
        
        for(var i=0;i<nJobs;i++){

		$.ajax({url:`/parallel?seq=${seq}&family=${family}&nClasses=${nClasses}&K=${K}&fls=${data["jobs"][i]}&ind=${i}`, type: 'GET', crossDomain: true, success:function(data, status){
                console.log(data);
                results[data['ind']] = data;
                
                var d2 = new Date();
                var n2 = d2.getTime();

                console.log((n2-n)/1000);
                done++;

            }});
		  
        }

        var ele = setInterval(function(){
            console.log(done);

            if(done==nJobs){

                clearInterval(ele);
                
                var maxx = results[0]['proba'];
                var maxxClass = results[0]['cluster'];
                var all_proba = [];

                for(var i2=0;i2<nJobs;i2++){

                    if(maxx < results[i2]['proba']){
                        maxx = results[i2]['proba'];
                        maxxClass = results[i2]['cluster'];
                    }

                    all_proba = all_proba.concat(results[i2]['all_proba']);
                    
                }

                var all_proba = all_proba.toString();
		console.log(all_proba);

		$.ajax({url:`/anomaly?proba_str=${all_proba}`,type: 'GET', crossDomain: true, success: function(data, status){
                    console.log(data);
                    
                    if(data["valid"]==="1")
                    {
                        document.location.href = `/results?seq=${seq}&family=${family}&nClasses=${nClasses}&K=${K}&cluster=${maxxClass}`;
                    }

                    else
                    {
                        document.location.href = `/outlier?seq=${seq}`;
                    }
                
                }});
                               
                
            }
            
        },500);

        
    }});

}

/*

    $.get(`http://127.0.0.1:5000/njobs?family=${family}&nClasses=${nClasses}&K=${K}&nJobs=${nJobs}`, function(data, status){
									        
        console.log(data);

        var start = 0;
        var joined = 0;

        var d = new Date();
        var n = d.getTime();

        var results = [];

        var done = 0;
        
        for(var i=0;i<nJobs;i++){
            
            $.get(`http://127.0.0.1:5000/parallel?seq=${seq}&family=${family}&nClasses=${nClasses}&K=${K}&fls=${data["jobs"][i]}&ind=${i}`, function(data, status){
                console.log(data);
                results[data['ind']] = data;
                
                var d2 = new Date();
                var n2 = d2.getTime();

                console.log((n2-n)/1000);
                done++;

            });
        }

        var ele = setInterval(function(){
            console.log(done);

            if(done==nJobs){

                clearInterval(ele);
                
                var maxx = results[0]['proba'];
                var maxxClass = results[0]['cluster'];
                var all_proba = [];

                for(var i2=0;i2<nJobs;i2++){

                    if(maxx < results[i2]['proba']){
                        maxx = results[i2]['proba'];
                        maxxClass = results[i2]['cluster'];
                    }

                    all_proba = all_proba.concat(results[i2]['all_proba']);
                    
                }

                var all_proba = all_proba.toString();
                console.log(`http://127.0.0.1:5000/anomaly?proba_str=${all_proba}`);
                
                $.get(`http://127.0.0.1:5000/anomaly?proba_str=${all_proba}`, function(data, status){
                    console.log(data);
                    
                    if(data["valid"]==="1")
                    {
                        document.location.href = `/results?seq=${seq}&family=${family}&nClasses=${nClasses}&K=${K}&cluster=${maxxClass}`;
                    }

                    else
                    {
                        document.location.href = `/outlier?seq=${seq}`;
                    }
                
                });
                
            }
            
        },500);

        
    });
    
    
}
*/
