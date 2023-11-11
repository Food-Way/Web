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

export { ModalSuccess }