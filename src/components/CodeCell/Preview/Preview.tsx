import { useEffect, useRef } from "react";
import './preview.css';

interface IProps {
  code: string;
  err: string;
}

const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (err) => {
        document.querySelector('#root').innerHTML = 
        '<div style="color: red;"><h4>Runtime Error:</h4>' + err + '</div>';
        console.error(err);
      };

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      });

      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err){
          handleError(err);
        }
      }, false);
    </script>
  </body>
</html>
`;

function Preview({code, err}: IProps) {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcDoc = html;
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code]);


  return (
    <>
      <iframe 
        title='code preview' 
        ref={iframe} 
        sandbox='allow-scripts' 
        srcDoc={html} 
        width={1300}
      />
      {err && <div className="preview-error">{err}this is error</div>}
    </>
  )
}

export default Preview