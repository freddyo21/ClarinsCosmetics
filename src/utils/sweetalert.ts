import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2'

export function sweetalert(
    title: string | HTMLElement | JQuery,
    icon: SweetAlertIcon,
    html: string | HTMLElement | JQuery,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback?: (result?: SweetAlertResult<any>) => void
) {
    Swal.fire({
        title: title,
        icon: icon,
        html: html,
        confirmButtonText: "OK",
        confirmButtonColor: icon === "error" ?
            "#ff1100" : icon === "warning" ?
                "#f8bb86" : icon === "info" ?
                    "#3085d6" : icon === "success" ?
                        "#009900" : "#3085d6",
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then(callback);
}

export function swalQuestionTrueFalse(
    title: string | HTMLElement | JQuery,
    icon: SweetAlertIcon,
    html: string | HTMLElement | JQuery,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    then: (result?: SweetAlertResult<any>) => void
) {
    Swal.fire({
        title: title,
        icon: icon,
        html: html,
        confirmButtonText: "Có",
        confirmButtonColor: "#009900",
        showDenyButton: true,
        denyButtonText: "Không",
        denyButtonColor: "#dd3300",
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then(then);
}