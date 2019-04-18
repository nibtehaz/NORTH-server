import os
from flask import Flask, render_template, send_from_directory, request, jsonify
from sklearn.ensemble import RandomForestClassifier
from werkzeug import secure_filename
from backend import *
from input_processing import *


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = ''
cnt = 0
global rf
rf = pickle.load(open('rf.p','rb'))

@app.route('/', methods = ['GET', 'POST'])
def home():
	if request.method == 'POST':
		# check if the post request has the file part
		if 'file' not in request.files:			
			return render_template("index.html",err=True)

		file = request.files['file']
		# if user does not select file, browser also
		# submit an empty part without filename
		if file.filename == '':			
			return render_template("index.html",err=True)

		filename = secure_filename(file.filename)
		file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
		seq = parse_file(os.path.join(app.config['UPLOAD_FOLDER'], filename))

		if(seq=='error'):
			return render_template("index.html",err=True)

		#print(request.args.get("family"))
		#print(request.args.get("nClasses"))
		#print(request.args.get("K"))

		return render_template("processing.html",seq=seq,family=request.form["family"], nClasses= request.form["nClasses"], K= request.form["K"])

	else:
		return render_template("index.html")

	

@app.route('/favicon.ico') 
def favicon(): 
	return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/submit')
def submit():

	seq = None 
	#print(request.args)
	if(request.args.get("mode")=='1'):
		#print(1)
		seq = request.args.get("seq")

	elif(request.args.get("mode")=='2'):
		#print(2)
		seq = parse_fasta(request.args.get("seq"))

	elif(request.args.get("mode")=='3'):
		#print(3)
		seq = obtain_sequence_from_uniprot(request.args.get("seq"))

	#print(seq)

	return render_template("processing.html",seq=seq,family=request.args.get("family"), nClasses= request.args.get("nClasses"), K= request.args.get("K"))


@app.route('/njobs')
def njobs():
	return jsonify(numChilds(family=request.args.get("family"), nClasses= request.args.get("nClasses"), K= request.args.get("K"), nJobs=request.args.get("nJobs") ))

@app.route('/parallel')
def parallel():
	return jsonify(childPredict(seq=request.args.get("seq"),family=request.args.get("family"), nClasses= request.args.get("nClasses"), K= request.args.get("K"), fls= request.args.get("fls"), ind = request.args.get("ind")))

@app.route('/process')
def process():
	return jsonify(predict(seq=request.args.get("seq"),family=request.args.get("family"), nClasses= request.args.get("nClasses"), K= request.args.get("K")))

@app.route('/results')
def results():
	return render_template("results.html",seq=request.args.get("seq"),family=request.args.get("family"), nClasses= request.args.get("nClasses"), K= request.args.get("K"), cluster= request.args.get("cluster"))

@app.route('/cluster')
def cluster():
	return jsonify(get_members(cluster=request.args.get("cluster"), family=request.args.get("family"), nClasses= request.args.get("nClasses")))

@app.route('/anomaly')
def anomaly_rf():
	global rf
	return jsonify(anomaly_detection(rf, proba_str= request.args.get("proba_str")))

@app.route('/outlier')
def outlier_pg():
	return render_template("anomaly.html",seq=request.args.get("seq"))


def create_app():
	return app


if __name__ == '__main__':
	
	# running the app

	app.debug = False
	app.run(host="127.0.0.1",port="5000")
	
