CREATE TABLE IF NOT EXISTS page_component
(
    id SERIAL PRIMARY KEY,
    page_id int,
    type text,
    name text,
    html_code text,
    css_code text,
    js_code text,
    html_vars json,
    css_vars json,
    js_vars json,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    is_deleted boolean,
    CONSTRAINT fk_page FOREIGN KEY (page_id)
        REFERENCES page (id) MATCH SIMPLE
)



CREATE TABLE IF NOT EXISTS page
(
    id SERIAL PRIMARY KEY,
    type text,
    name text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    is_deleted boolean
)



INSERT INTO public.page(
	type, name
)
VALUES (
    'LANDING_PAGE', ''
);



INSERT INTO public.page_component(
	page_id, type, name, html_code, css_code, js_code, html_vars, css_vars, js_vars
)
VALUES (
    1, null, 'CONTENT', '<div>test</div>', '', '', '{"test": 123}', '{"test": 123}', '{"test": 123}'
);


