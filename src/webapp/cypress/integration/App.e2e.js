import 'cypress-file-upload';

describe('Trial upload', () => {
  it('end 2 end', () => {
    const fileName = '../../src/images/item4.jpg';
    cy.visit('https://localhost:3000/try-it');
    debugger;
    cy.get('[tag="input"]')
      .attachFile(fileName);
    cy.get('[tag="upload"]').click({ force: true });
    cy.wait(90000);
    cy.get('[tag="download"]').click();
    cy.fixture('item4-processed.jpg', 'binary').then((data) => {
      cy.window().then(win => {
        const converted = convertDataToBinary(win.store.getState().upload.processedImage);        
        expect(Uint8Array.from(data, x => x.charCodeAt(0))).to.deep.equal(converted);
      })
    });
  });
});

function convertDataToBinary(encoded) {
  const BASE64_MARKER = ';base64,';
  const base64Index = encoded.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  const base64 = encoded.substring(base64Index);
  const raw = window.atob(base64);
  const rawLength = raw.length;
  const array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}