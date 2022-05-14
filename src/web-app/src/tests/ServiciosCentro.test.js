import { render, screen } from '@testing-library/react';
import { ServiciosCentro } from '../views/ServiciosCentro';

it('check Snapshot', () => {
    sessionStorage.setItem("userEncriptado", "U2FsdGVkX19xzuw7siriOwWmKCC0aYFwXHCMSq03x0JqbjP5tGHVmPsl+fZkzPFWcxWAOwis5v2YV611NESiJq1BNdnlc7bzG3BhzJ1ffEgWD00SFb7gc3aUsPT7KtbGvq1WZzOFNPTLFXlzBDx9gin/S8YK5MAknzcsi7KFgZErverPEgo8p5Caq9hj8QW3l+EZUDXC/yCTDlEp4ORmq6frCJhG1SyZktdOXv1NQFCyxEK1g0HUAiUzWc5udiPLRMpkymxPsuwWbr5ZO1z8wOuxUaDVuVDVUN25oYeivJFVx+7dY2J3MLOFyoz3ysttDQ+dgdLfxCVYWIIjCNb2vMrcCdDh7W0AlyGMbDdQD7KH6J7GMjqfx3FbbX23TFxojUP2Rtf8sMLWJvVzyRAxWM5Atts/sGsJ3wP8X+xZCLDJtByFuraBMFsRAOUXUZWpDXSDIDDOup0xDroCcDVszk/yO66npeUn1oCgZbbBmjUIn5VxiYqrXZ+ZHjqnqRGXDY4I9KjF1Gv/fdk4aqUAoMI6vl1tXZclsVetGu0c5BKiXR+WXQG/oDgB7TgzjI4M5u9QcfJyl9puugHl3sVDN0dX/n8Xz6jq1GtrLzDaxz6vlBuFzvF0RmuPnBD+8HKUSVoZmjB7nuVuiIamXjmc87QiZmtESWwyGwGr7djpKEs7ZtFKAN0+5oqACDOWin2wefAsaGg1cpOb/PBoGec6vdIpdaGdgax7wFG/MAjpwmlkLqeX2c8jedXLurxNCBDqwjmGxTJGwe3PCkuHzAtl/XI6LvFFkuDgSVva7Sga3WD558C8VecqUdkObTc0rscYH0lVXoVeRlpf0awRMvdGq3sfzbym+sdSYA5gcS9Z5Ls=");
    render(<ServiciosCentro/>);
    const element = screen.getByText("Registro Servicios");
    expect(element).toBeInTheDocument();
});