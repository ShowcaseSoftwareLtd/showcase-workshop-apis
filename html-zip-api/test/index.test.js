import HtmlZipApi from '../index';

describe('index', () => {

  describe('basic get and set', () => {

    const htmlZipApi = new HtmlZipApi({
      testMode: true,
    });

    test('email', () => {
      return expect(htmlZipApi.getEmail()).resolves.toBe('example@example.com');
    });

    test('get empty', () => {
      return expect(htmlZipApi.get('some key')).resolves.toBe(undefined);
    });

    test('set & get something', () => {
      htmlZipApi.put('some key', 'some value');
      return expect(htmlZipApi.get('some key')).resolves.toBe('some value');
    });

  });

  describe('verify window events', () => {

    const htmlZipApi = new HtmlZipApi();

    const promiseWithTimeout = (promise) => {
      let timer = null;
      return Promise.race([promise,
        new Promise((_r, reject) => {
          timer = setTimeout(() => reject("timeout"), 2000);
        })
      ]).finally(() => clearTimeout(timer));
    };

    const listenForMessageWithTimeout = (windowOnMessage, init) => {
      return promiseWithTimeout(new Promise((resolve) => {
        window.addEventListener('message', (e) => {
          windowOnMessage(e, resolve);
        });
        init();
      }));
    };

    test('controls home', () => {
      return listenForMessageWithTimeout((e, resolve) => {
        e.data.SHOWCASE_DATA.type === 'CONTROLSHOME' ? resolve() : ''
      }, () => {
        htmlZipApi.home();
      });
    });

    test('controls back', () => {
      return listenForMessageWithTimeout((e, resolve) => {
        e.data.SHOWCASE_DATA.type === 'CONTROLSBACK' ? resolve() : ''
      }, () => {
        htmlZipApi.back();
      });
    });


  });
});
