import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React from "react";

const Editor = ({touched, error, ...props}) => {
    return (
        <div className="Post mb-5">
            <CKEditor
                data={props.values.text}
                editor={ClassicEditor}
                config={{toolbar: {
                            items: [
                                'heading',
                                '|',
                                'bold',
                                'italic',
                                'link',
                                'bulletedList',
                                'numberedList',
                                'blockQuote',
                                '|',
                                'undo',
                                'redo'
                            ]
                        },
                        language: 'fa'
                    }
                }
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log(props);
                    props.setFieldValue("text", data);
                }}
                onBlur={() => {
                    touched();
                }}
            />
            {error && (
                <span className="error">{props.errors.text}</span>)}
        </div>
    );
};

export default Editor;