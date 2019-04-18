# Bismillahir Rahmanir Rahim
# Rabbi Zidni Ilma 

import pickle
from tqdm import tqdm
from math import ceil
from ScalableNaiveBayes import ScalableNaiveBayes


def train(dataFile,K,nClasses,family):

    (X,Y, vSize)=pickle.load(open(dataFile,'rb'))
    
    (documents, total) = readData(X,Y)

    nb = ScalableNaiveBayes(modelName='models/model'+str(family)+str(K),vSize=vSize,totalData=total,nChild=3)
        
    print('Training')

    nb.train(documents,K)

    documents = None



def readData(X,Y):

    '''
            Takes [ (X,Y) ... (X,Y)] as input
            Returns [ ((x1,x2,..,xn),Y) ... ] as output

    '''

    documents = []
    clsMapper = {}
    vocabulary = {}

    total = len(X)

    tqdm.write('Preparing for training')

    for i in tqdm(range(len(X))):                

        try:

            documents[clsMapper[Y[i]]][0].append(X[i])

        except:

            clsMapper[Y[i]] = len(clsMapper)
            documents.append(([X[i]],Y[i]))

    
    #print(vocabulary)
    #t=input('')


    pickle.dump((documents,total),open('data.p','wb'))

    #print(documents)
    #input('docs : '+str(len(documents)))

    return (documents, total)


def main():
    
    train('../Ortholog/all.p',5,250,'all')

if __name__ == '__main__':
    main()