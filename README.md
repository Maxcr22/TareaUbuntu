El primera que paso se realizo fue la instalación de la maquina virtual desde la pagina oficila de Oracle(https://www.oracle.com/es/virtualization/technologies/vm/downloads/virtualbox-downloads.html?source=:ow:o:p:nav:mmddyyVirtualBoxHero_es&intcmp=:ow:o:p:nav:mmddyyVirtualBoxHero_es), junto a la imagen ISO de Ubuntu en su pagina oficial igualmente(https://releases.ubuntu.com/22.04/)
Luego al haber instalado el Ubuntu en la virtual box se hace la configuración de esta misma para la instalación de Node.js y express
Los pasos siguientes para configurar e instalar lo necesario fueron:
1-Actualiza los paquetes con el comando: sudo apt update
2-Instala el NVM con el comando: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
3-Usa wgety con el comando: wget -q0- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
4-Cierra y vuelva a abrir la terminal para que el sistema reconozca los cambios con el comando: source ~/.bashrc
5-Revisa si esta instalado debidamente el NVM:nvm --version
6-Comprueba la versión del sistema: nvm ls
7-Busca nuevas versiones: nvm ls-remote
8-Ultimamente instala la ultima versión: nvm install [numero de versión]
