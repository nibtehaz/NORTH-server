var family = "all";
var nClasses = 250;
var K = 5;

var file_mode = 1;

function fmlyBtn(btnID)
{
    
    // old button
    var button = document.getElementById(family);

    button.classList.remove("waves-light");    
    button.classList.add("waves-teal");
    button.classList.add("btn-flat");

    // update family
    family = btnID;

    // new button

    var button = document.getElementById(family);

    button.classList.remove("waves-teal");
    button.classList.remove("btn-flat");
    button.classList.add("waves-light");
    
    
    //console.log(family);
    //console.log(button.classList);
}

function rangeSlide()
{
    slider = document.getElementById('slider');

    var arr = [10,50,100,150,200,250];

    for(var i=1; i<arr.length; i++)
    {
        if(arr[i-1]<=slider.value && slider.value<=arr[i])
        {
            if((slider.value-arr[i-1])<(arr[i]-slider.value))
            {
                slider.value = arr[i-1];
            }

            else
            {
                slider.value = arr[i];
            }
        }
    }

    sliderValue = document.getElementById('sliderValue');
    
    sliderValue.text = slider.value;        
}


function rdoBtn(rdoID)
{
    if(rdoID=='radio1')
    {
        file_mode = 1;
        document.form_control.action = "#";
        document.form_control.method = "GET";
        document.form_control.enctype = "";
        document.getElementById("sequenceArea").value="MFLGGTISTPPASLRLRSTLNPQNAVTQSSSQATFPAAMQRKPPSYSISDEDLESRGFLLRRTTEGLNLDQLNSVFAAVGFPRRDTAKIEVALQHTDALLWVEYEKTRRPVAFARATGDGVFNAIIWDVVVDPSFQSCGLGKAVMERLIEDLQVKGICNIALYSEPRVLGFYRPLGFVSDPDGIKGMVFIRKQRNKK";
    }
    
    else if(rdoID=='radio2')
    {
        file_mode = 2;
        document.form_control.action = "#";
        document.form_control.method = "GET";
        document.form_control.enctype = "";
        document.getElementById("sequenceArea").value=">tr|Q9C666|Q9C666_ARATH Acyl-CoA N-acyltransferases (NAT) superfamily protein OS=Arabidopsis thaliana OX=3702 GN=At1g26220 PE=2 SV=1\nMFLGGTISTPPASLRLRSTLNPQNAVTQSSSQATFPAAMQRKPPSYSISDEDLESRGFLLRRTTEGLNLDQLNSVFAAVGFPRRDTAKIEVALQHTDALLWVEYEKTRRPVAFARATGDGVFNAIIWDVVVDPSFQSCGLGKAVMERLIEDLQVKGICNIALYSEPRVLGFYRPLGFVSDPDGIKGMVFIRKQRNKK";
    }

    else if(rdoID=='radio3')
    {
        file_mode = 3;
        document.form_control.action = "#";
        document.form_control.method = "GET";
        document.form_control.enctype = "";
        document.getElementById("sequenceArea").value="Q9C666";
    }
    
    else if(rdoID=='radio4')
    {    
        file_mode = 4;
        document.form_control.action = "/";
        document.form_control.method = "POST";
        document.form_control.enctype = "multipart/form-data";
        document.getElementById("sequenceArea").value="Please upload a text file in fasta format";
    }
}

function submit()
{
    if(file_mode===4)
    {
        document.getElementById("form_control").submit();
    }

    else
    {
        var seq = document.getElementById('sequenceArea').value;
	console.log(seq);

        if(seq.length==0)
        {
            seq = 'MFLGGTISTPPASLRLRSTLNPQNAVTQSSSQATFPAAMQRKPPSYSISDEDLESRGFLLRRTTEGLNLDQLNSVFAAVGFPRRDTAKIEVALQHTDALLWVEYEKTRRPVAFARATGDGVFNAIIWDVVVDPSFQSCGLGKAVMERLIEDLQVKGICNIALYSEPRVLGFYRPLGFVSDPDGIKGMVFIRKQRNKK';    
        }
        
        document.location.href = `/submit?seq=${seq}&family=${family}&nClasses=${nClasses}&K=${K}&mode=${file_mode}`;
    }
    
}
