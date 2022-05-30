const fs = require('fs');

class ContainerArchivo {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async guardarLocal(content) {
        await fs.writeFileSync(this.fileName, JSON.stringify(content));
    }

    async getContent() {
        let content = [];
        try {
            let data = await fs.readFileSync(this.fileName, 'utf-8');
            content = JSON.parse(data);
        } catch (error) {
            await this.guardarLocal(content);
            console.log(`Creacion del archivo ${this.fileName}`);
        }

        return content;
    }
}

module.exports = { ContainerArchivo }