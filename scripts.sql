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
    1, 'CONTENT', 'section for who',
    '<section class="section-for-who">
  <div class="container section-for-who__container">
    <div class="">
      <header class="section-for-who__header">
        <h2 class="">{{header.title}}</h2>
        <p class="">
          {{header.text}}
        </p>
      </header>

      <ul class="section-for-who__boxes">
        {{#each boxes}}
        <li class="section-for-who__box">
          <article class="box">
            <header class="box__header">
              <img width="40" height="40" class="" src="./content/check-rect-blue.svg" alt="">
              <h3 class="">{{this.title}}</h3>
            </header>
            <p>{{this.text}}</p>
          </article>
        </li>
        {{/each}}
      </ul>
    </div>
  </div>
</section>
',
    '',
    '',

    '{"test": 123}', '{"test": 123}', '{"test": 123}'
);



CREATE OR REPLACE FUNCTION update_page_component(
        p_page_component_id integer,
        p_name text,
        p_html_code text,
        p_css_code text,
        p_js_code text,
        p_html_vars text,
        p_css_vars text,
        p_js_vars text
	)
    RETURNS integer
    LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
	v_updatedCount int;
BEGIN
	WITH updated AS
	(
		UPDATE page_component
        SET
            name = p_name,
            html_code = p_html_code,
            css_code = p_css_code,
            js_code = p_js_code,
            html_vars = p_html_vars::json,
            css_vars = p_css_vars::json,
            js_vars = p_js_vars::json,
            updated_at = now()
        WHERE
            id = p_page_component_id
		RETURNING *
	)
	SELECT count(*) FROM updated into v_updatedCount;
	RETURN v_updatedCount;
END;
$BODY$;


ALTER TABLE page_component
ADD COLUMN local_url text;



CREATE OR REPLACE FUNCTION create_page_component(
        p_name text,
        p_html_code text,
        p_css_code text,
        p_js_code text,
        p_html_vars text,
        p_css_vars text,
        p_js_vars text
	)
    RETURNS integer
    LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
	v_id int;
BEGIN

    INSERT INTO page_component(
        name,
        html_code,
        css_code,
        js_code,
        html_vars,
        css_vars,
        js_vars,
        updated_at
    )
    VALUES(
        p_name,
        p_html_code,
        p_css_code,
        p_js_code,
        p_html_vars::json,
        p_css_vars::json,
        p_js_vars::json,
        now()
    )
    RETURNING id INTO v_id;

	RETURN v_id;
END;
$BODY$;

