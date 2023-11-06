import Swal from 'sweetalert2'

import React from 'react';

function ModalSuccess (props) {
    return (
        Swal.fire({
            icon: 'success',
            title: props.title,
            text: props.text,
        })
    );
}

function AlertConfirm(props) {
    Swal.fire({
        title: props.title,
        text: props.text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: props.txtConfirm
    }).then((result) => {

    })
}

export { ModalSuccess, AlertConfirm }