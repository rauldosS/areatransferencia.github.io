copiar = (elem, icone) => {
    alterarIcone(icone, 'bi-clipboard', 'bi-clipboard-check')
    // crie um elemento de texto oculto, se ainda não existir
    var targetId = "_hiddenCopyText_"
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA"
    var origSelectionStart, origSelectionEnd

    if (isInput) {
        // pode apenas usar o elemento fonte original para a seleção e cópia
        target = elem
        origSelectionStart = elem.selectionStart
        origSelectionEnd = elem.selectionEnd

    } else {
        // deve usar um elemento de formulário temporário para a seleção e cópia
        target = document.getElementById(targetId)

        if (!target) {
            var target = document.createElement("textarea")
            
            target.style.position = "absolute"
            target.style.left = "-9999px"
            target.style.top = "0"
            
            target.id = targetId

            document.body.appendChild(target)
        }

        target.textContent = elem.textContent
    }

    // seleciona o conteúdo
    var currentFocus = document.activeElement
    target.focus()
    target.setSelectionRange(0, target.value.length)
    
    // copie a seleção
    var succeed
    try {
        succeed = document.execCommand("copy")
    } catch(e) {
        succeed = false
    }
    // restaurar o foco original
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus()
    }
    
    if (isInput) {
        // restaurar a seleção anterior
        elem.setSelectionRange(origSelectionStart, origSelectionEnd)
    } else {
        // limpar conteúdo temporário
        target.textContent = ""
    }

    return succeed
}

alterarIcone = (icone, remover, adicionar) => {
    icone.classList.remove(remover)
    icone.classList.add(adicionar)

    setTimeout(() => {
        icone.classList.remove(adicionar)
        icone.classList.add(remover)
    }, 1000)
}