set shell := ['nu', '-c']

build:
    nu build.nu

watch:
    watch . --glob='vencord.sass' { |op, path| if $op == Create { just build } }
