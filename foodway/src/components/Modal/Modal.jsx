import React from 'react';
import Swal from 'sweetalert2';
import api from '../../services/api';

import './Modal.css';

function HandleModalDelete(props) {
    function openDelete() {
        return Swal.fire({
            title: props.title,
            text: props.text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#ED0000',
            cancelButtonColor: '#222',
            confirmButtonText: props.confirmText
        }).then((result) => {
            if (result.isConfirmed) {
                const response = api.delete(`/products/${props.idProduct}`, {
                    headers: {
                        Authorization: 'Bearer ' + atob(sessionStorage.getItem("token")),
                    },
                })
                    .then((response) => {
                        if (response.status === 200) {
                            TimedSuccessModal(props.successTitle);
                        };
                    })
                    .catch((erro) => console.log(erro));
            }
        });
    }

    return (
        <>
            <button onClick={openDelete} className='modal-button'>{props.content}</button>
        </>
    );
}

function formModal(props) {
    console.log("props" + props);
    Swal.fire({
        customClass: {
            heightAuto: false,
            popup: 'modal-popup-class modal-box modal-input-box',
        },
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#ED0000',
        cancelButtonColor: '#222',
        confirmButtonText: props.confirmText,
        cancelButtonText: props.cancelText,
        html: location.pathname === '/establishment/performance/menu' ? `
    <div className="modal-container">
      <div className="modal-box">
        <div className="modal-input-box">
          <label htmlFor="${props.iptProductName}">${props.lblCampo1}</label>
          <input type="text" id="${props.iptProductName}" value=${props.name === undefined ? " " : props.name}>
        </div>
        <div className="modal-input-box">
          <label htmlFor="${props.iptProductPrice}">${props.lblCampo2}</label>
          <input type="text" id="${props.iptProductPrice}" value=${props.price === undefined ? " " : props.price}>
        </div>
      </div>
    </div>
    ` : `
    <div className="modal-container">
        <div className="modal-box">
          <div className="modal-input-box">
            <label htmlFor="${props.iptProductName}">${props.lblCampo1}</label>
            <input type="text" id="${props.iptProductName}" value=${props.name === undefined ? " " : props.name}>
          </div>
          <div className="modal-input-box">
            <label htmlFor="${props.iptProductPrice}">${props.lblCampo2}</label>
            <input type="text" id="${props.iptProductPrice}" value=${props.price === undefined ? " " : props.price}>
          </div>
          <div className="modal-input-box">
          <input
            className="input-file"
            type="file"
            name="cover"
            id="cover"
            onChange={handleFileChangeCover}
            />
          </div>
        </div>
      </div>
    `
    }).then((result) => {
        if (result.isConfirmed) {
            var data;

            if (location.pathname === '/establishment/performance/menu') {
                data = {
                    name: document.getElementById(props.iptProductName).value,
                    price: document.getElementById(props.iptProductPrice).value,
                    idEstablishment: atob(sessionStorage.getItem('idUser')),
                };
            }

            const headers = {
                Authorization: 'Bearer ' + atob(sessionStorage.getItem('token')),
            };

            api({
                method: props.method,
                url: props.uri,
                data: data,
                headers: headers,
            })
                .then((response) => {
                    if (response.status === props.status) {
                        console.log("response" + response);
                        TimedSuccessModal(props.successTitle);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }).catch((erro) => {
        console.log(erro);
    });
}


function HandleFormModal(props) {
    return (
        <>
            <button onClick={() => { formModal(props) }} className='modal-button'>{props.content}</button>
        </>
    )
}

function TimedSuccessModal(title) {
    Swal.fire({
        icon: "success",
        title: title,
        showConfirmButton: false,
        timer: 1500
    }).then(() => {
        window.location.reload();
    })
}



export { HandleModalDelete, HandleFormModal };