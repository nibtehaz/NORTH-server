var family = "Eukaryotes";
var nClasses = 10;

$(function () {
    $('[data-toggle="popover"]').popover()
  })

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
        document.getElementById("sequenceArea").placeholder="MIPYVNEYDTPECKTLAETAKKSIRTPASLGLDRCIQCGACTASCPAARFTDYSPRQIVKKVLENDRSVLESEMIWSCFYCYSCNLRCPRNNSPVTIVQVLRQMAINEGIGVEKLAYFLEIGEYLAENGASKIPGPGAKNMERDLGERWISFKKNLESIRDELGLSSKDIRNTHGEVQAILEATGYFEREKWIKAKIQEKLLHQLLENQYIKRENRSGDFGFENDRRYPGQPAFII";
    }

    else if(rdoID=='radio2')
    {
        document.getElementById("sequenceArea").placeholder=">tr|Q46B51|Q46B51_METBF Heterodisulfide reductase subunit HdrC OS=Methanosarcina barkeri (strain Fusaro / DSM 804) OX=269797 GN=Mbar_A1953 PE=4 SV=1\nMIPYVNEYDTPECKTLAETAKKSIRTPASLGLDRCIQCGACTASCPAARFTDYSPRQIVKKVLENDRSVLESEMIWSCFYCYSCNLRCPRNNSPVTIVQVLRQMAINEGIGVEKLAYFLEIGEYLAENGASKIPGPGAKNMERDLGERWISFKKNLESIRDELGLSSKDIRNTHGEVQAILEATGYFEREKWIKAKIQEKLLHQLLENQYIKRENRSGDFGFENDRRYPGQPAFII";
    }
    
    else
    {
        document.getElementById("sequenceArea").placeholder="Please upload a text file in fasta format";
    }
}
