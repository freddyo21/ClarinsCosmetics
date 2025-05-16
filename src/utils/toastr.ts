import toastr from 'toastr';

const options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: true,
    showDuration: 300,
    hideDuration: 1000,
    timeOut: 3000,
    extendedTimeOut: 1000,
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    tapToDismiss: false,
    target: "body"
}

export function toastrSuccess(title: string, message: string) {
    return toastr.success(message, title, options);
}

export function toastrError(title: string, message: string) {
    return toastr.error(message, title, options);
}

export function toastrInfo(title: string, message: string) {
    return toastr.info(message, title, options);
}

export function toastrWarning(title: string, message: string) {
    return toastr.warning(message, title, options);
}