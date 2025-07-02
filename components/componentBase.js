class componentBase extends HTMLElement { 

	constructor(){
		super();
		this._itemLbs;
		this._id = 0;
        this._value = "";
        this._pagina = 0;
        this._unsubscribe = undefined;
        this.attachShadow({ mode: 'open' });
        //const url = (window.location != window.parent.location) ? document.referrer : document.location.href;
        //console.log("url:",url);
        this._isAndroid = window.location.protocol == "file:" ? true : false;
        this._isMobile = /Android|iPhone|iPad|iPod|kindle|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || navigator.maxTouchPoints > 0;
        this.Visor = this._isAndroid ? parent.Visor :  Visor;
	}


	_saveData() {
		console.log("_saveData");
		const promise = new Promise((resolve, reject) => {
            const { usuario } = this.Visor.tokenUser;
            const idLibro     = this.Visor.idLibro;
            const claveLibro  = this._isAndroid ? parent.IDRViewer.config.fileName.replace(".pdf",'') : IDRViewer.config.fileName.replace(".pdf",'');

            const widgetData = {
                data: this._itemLbs.value, 
                ejercicio : "0",
                elemento: this._id,
                estado : 2,
                libroid : idLibro,
                pagina : this._pagina,
                ...this._extraFields
            }

            this.Visor.saveDataFireStore({...widgetData}).then(()=>{
                resolve("data");
            }).catch(err => reject(err));

            /*this.Visor.dbFirestore.doc(`${usuario}/libros`)
                             .collection(claveLibro)
                             .doc(this._id)
                             .set(widgetData)
            .then(()=> console.log)
            .catch(error => console.error("Error adding document: ", error));*/
        });

        return promise;
	}

    _deleteData(item){
        console.log("_deleteData");
        const { usuario } = this.Visor.tokenUser;
        const claveLibro  = this._isAndroid ? parent.IDRViewer.config.fileName.replace(".pdf",'') : IDRViewer.config.fileName.replace(".pdf",'');

        const search = this.Visor.store.getState().bookReducer.filter(a => a.elemento !== item);
        this.Visor.store.getState().bookReducer = search;
        console.log("Document successfully deleted!");
        
        this.Visor.dbFirestore.doc(`${usuario}/libros`)
                         .collection(claveLibro)
                         .doc(item)
                         .delete()
        .then(() => {
            // const search = this.Visor.store.getState().bookReducer.filter(a => a.elemento !== item);
            // this.Visor.store.getState().bookReducer = search;
            // console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
}