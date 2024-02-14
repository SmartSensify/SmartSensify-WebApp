import 'bootstrap/dist/css/bootstrap.min.css';

interface AlertProps {
    Header: string;
    Message: string;
    Type: string;
}

export const showAlert = ({ Header, Message, Type = 'success' }: AlertProps): void => {
    const alertHolder = document.getElementById('alert-holder');

    if (alertHolder) {
        const alertHtml = `
            <div class="alert alert-${Type} alert-success alert-dismissible fade show" role="alert">
                <strong>${Header}</strong> ${Message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        alertHolder.innerHTML = alertHtml;

        const alertElement = alertHolder.querySelector('.alert');
        if (alertElement) {
            setTimeout(() => {
                alertElement.classList.add('d-none');
                alertElement.addEventListener('transitionend', () => {
                    alertElement.remove();
                });
            }, 3000);
        }
    }
};
