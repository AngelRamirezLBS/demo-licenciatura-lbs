/**
 * Clase para gestionar cambios de contenido en Genially
 */
class GeniallyContentManager {
  constructor(showLog = false) {
    this.showLog = showLog;
    this.dataGenially = window.dataGeniallyOffline;
  }

  /**
   * Verifica si el objeto dataGeniallyOffline está disponible
   * @param {string} section - Sección a verificar (Texts, Images, Svgs, etc.)
   * @returns {boolean}
   */
  _isDataAvailable(section) {
    if (!this.dataGenially || !this.dataGenially[section]) {
      if (this.showLog) {
        console.error(`Error: window.dataGeniallyOffline.${section} no está disponible`);
      }
      return false;
    }
    return true;
  }

  /**
   * Busca un elemento por ID en una sección específica
   * @param {string} section - Sección donde buscar
   * @param {string} id - ID del elemento
   * @returns {object|null}
   */
  _findElement(section, id) {
    const element = this.dataGenially[section].find(item => item.Id === id);
    if (!element && this.showLog) {
      console.error(`Error: No se encontró elemento con ID "${id}" en ${section}`);
    }
    return element;
  }

  /**
   * Cambia el contenido de un texto
   * @param {string} textId - ID del texto a modificar
   * @param {string} newContent - Nuevo contenido HTML
   * @returns {boolean}
   */
  changeText(textId, newContent) {
    try {
      if (!this._isDataAvailable('Texts')) return false;

      const textElement = this._findElement('Texts', textId);
      if (!textElement) return false;

      const previousContent = textElement.TextMessage;
      textElement.TextMessage = newContent;

      if (this.showLog) {
        console.log(`✅ Texto modificado exitosamente:`);
        console.log(`   ID: ${textId}`);
        console.log(`   Contenido anterior: ${previousContent}`);
        console.log(`   Nuevo contenido: ${newContent}`);
      }

      return true;
    } catch (error) {
      if (this.showLog) console.error('Error al modificar texto:', error);
      return false;
    }
  }

  /**
   * Cambia la imagen de un elemento
   * @param {string} imageId - ID de la imagen a modificar
   * @param {string} imageSrc - Nueva URL de la imagen
   * @returns {boolean}
   */
  changeImage(imageId, imageSrc) {
    try {
      if (!this._isDataAvailable('Images')) return false;

      const imageData = this._findElement('Images', imageId);
      if (!imageData) return false;

      imageData.Source = imageSrc;

      if (this.showLog) {
        console.log(`✅ Imagen modificada exitosamente:`);
        console.log(`   ID: ${imageId}`);
        console.log(`   Nueva URL: ${imageSrc}`);
      }

      return true;
    } catch (error) {
      if (this.showLog) console.error('Error al modificar imagen:', error);
      return false;
    }
  }

  /**
   * Cambia el SVG de un elemento
   * @param {string} svgId - ID del SVG a modificar
   * @param {string} svgSrc - Nuevo contenido SVG
   * @returns {boolean}
   */
  changeSvg(svgId, svgSrc) {
    try {
      if (!this._isDataAvailable('Svgs') || !this._isDataAvailable('svgRefs')) {
        if (this.showLog) {
          console.error('Error: window.dataGeniallyOffline.Svgs o svgRefs no está disponible');
        }
        return false;
      }

      const svgData = this._findElement('Svgs', svgId);
      if (!svgData) return false;

      // Buscar la llave en svgRefs que coincida con svgData.SourceSvg
      const svgRefKey = this._findSvgRefKey(svgData.SourceSvg);

      if (svgRefKey) {
        this.dataGenially.svgRefs[svgRefKey] = svgSrc;
        if (this.showLog) {
          console.log(`✅ SVG modificado exitosamente:`);
          console.log(`   ID: ${svgId}`);
          console.log(`   Llave encontrada: ${svgRefKey}`);
        }
        return true;
      }

      // Intento alternativo: acceso directo
      if (this.dataGenially.svgRefs[svgData.SourceSvg] !== undefined) {
        this.dataGenially.svgRefs[svgData.SourceSvg] = svgSrc;
        if (this.showLog) {
          console.log(`✅ SVG modificado exitosamente (acceso directo):`);
          console.log(`   ID: ${svgId}`);
        }
        return true;
      }

      if (this.showLog) {
        console.warn(`No se encontró llave en svgRefs que coincida con: ${svgData.SourceSvg}`);
        console.log('Llaves disponibles:', Object.keys(this.dataGenially.svgRefs));
      }

      return false;
    } catch (error) {
      if (this.showLog) console.error('Error al modificar SVG:', error);
      return false;
    }
  }

  /**
   * Busca la llave en svgRefs que coincida con el SourceSvg
   * @param {string} sourceSvg - Valor a buscar
   * @returns {string|null}
   */
  _findSvgRefKey(sourceSvg) {
    return Object.keys(this.dataGenially.svgRefs).find(key => {
      const cleanKey = key.trim();
      const cleanSourceSvg = sourceSvg.trim();
      return cleanKey === cleanSourceSvg;
    });
  }

  /**
   * Aplica un cambio basado en el tipo de contenido
   * @param {object} contentItem - Objeto con id, type y content/src
   * @returns {boolean}
   */
  applyChange(contentItem) {
    const { id, type, content, src } = contentItem;

    switch (type) {
      case 'text':
        return this.changeText(id, content);
      case 'image':
        return this.changeImage(id, src);
      case 'svg':
        return this.changeSvg(id, src);
      default:
        if (this.showLog) {
          console.error(`Tipo de contenido no soportado: ${type}`);
        }
        return false;
    }
  }

  /**
   * Aplica múltiples cambios de una vez
   * @param {Array} contentItems - Array de objetos de contenido
   * @returns {Array} - Array con los resultados de cada cambio
   */
  applyChanges(contentItems) {
    return contentItems.map(item => this.applyChange(item));
  }
}

/**
 * Carga la configuración desde el archivo JSON
 * @returns {Promise<Array>} - Promise que resuelve con la configuración
 */
async function loadContentConfig() {
  try {
    const response = await fetch('./js/content-config.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const config = await response.json();
    console.log('✅ Configuración cargada exitosamente:', config.length, 'elementos');
    return config;
  } catch (error) {
    console.error('❌ Error al cargar la configuración:', error);
    // Configuración de respaldo en caso de error
    return [
      {
        id: "0a6c3768-0bb7-41f3-a4af-2a93cd3aadda",
        type: "text",
        content: '<div><span style="font-weight: bold;"><font color="#ffb432">TEST</font><span style="color: rgb(255, 255, 255);"> LBS</span></span></div>'
      },
      {
        id: "2fa4e0f9-0824-476d-8829-beb5cbb1ffd9",
        type: "text",
        content: '<span style="color: rgb(255, 255, 255);">Subtitulo de prueba</span>'
      }
    ];
  }
}

/**
 * Aplica todos los cambios de contenido
 */
(async () => {
  try {
    const config = await loadContentConfig();
    const manager = new GeniallyContentManager();
    const results = manager.applyChanges(config);

    const successCount = results.filter(result => result === true).length;
    const totalCount = results.length;

    console.log(`🎯 Cambios aplicados: ${successCount}/${totalCount} exitosos`);

    return results;
  } catch (error) {
    console.error('❌ Error al aplicar cambios:', error);
    return [];
  }
})();


