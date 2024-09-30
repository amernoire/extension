// Function to replace 'C' based on its position in a word
function replaceCWithBOrK(text) {
  return text
    .replace(/ency/g, 'ensy')
    .replace(/ENCY/g, 'ENSY')
    .replace(/Ce/g, 'Se')
    .replace(/ce/g, 'se')
    .replace(/CE/g, 'CE')
    .replace(/\bC/g, 'B')
    .replace(/C/g, 'K')
    .replace(/\bc/g, 'b')
    .replace(/c/g, 'k')
}

// Function to safely replace 'C' with 'B' or 'K' including placeholder text
function replaceTextCWithBOrK(node) {
  const excludedTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'OBJECT', 'CANVAS', 'LINK', 'META']

  // Safeguard: Make sure the node is valid and not part of an excluded tag
  if (!node || excludedTags.includes(node.nodeName)) {
    return
  }

  // Check if the node is a text node
  if (node.nodeType === Node.TEXT_NODE) {
    const parentElement = node.parentNode
    if (
      parentElement &&
      !parentElement.isContentEditable &&
      !['INPUT', 'TEXTAREA'].includes(parentElement.tagName)
    ) {
      // Replace 'C' with 'B' or 'K' in text nodes based on position
      node.textContent = replaceCWithBOrK(node.textContent)
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // Check if the element has a 'placeholder' attribute and replace 'C' in the placeholder
    if (node.hasAttribute && node.hasAttribute('placeholder')) {
      const placeholderText = node.getAttribute('placeholder')
      const newPlaceholder = replaceCWithBOrK(placeholderText)
      if (newPlaceholder !== placeholderText) {
        node.setAttribute('placeholder', newPlaceholder)
      }
    }

    // Recursively traverse child nodes, but limit recursion to avoid deep DOM crashes
    if (node.childNodes && node.childNodes.length > 0) {
      Array.from(node.childNodes).forEach(replaceTextCWithBOrK)
    }
  }
}

// Apply initial replacements on the current DOM
replaceTextCWithBOrK(document.body)

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver((mutations) => {
  observer.disconnect() // Temporarily disconnect to avoid infinite loop

  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      // Process newly added nodes
      mutation.addedNodes.forEach((node) => {
        replaceTextCWithBOrK(node)
      })
    } else if (mutation.type === 'characterData') {
      // Process changes in text content inside existing nodes
      replaceTextCWithBOrK(mutation.target)
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  }) // Reconnect the observer after modifications
})

// Start observing the DOM for changes
observer.observe(document.body, {
  childList: true, // Watch for added/removed nodes
  subtree: true, // Observe all descendants of body
  characterData: true, // Watch for text content changes
})

// Style filter for the page
const style = document.createElement('style')
style.type = 'text/css'
style.innerHTML = `
  body {
    filter: sepia(1) saturate(500%) hue-rotate(-50deg) contrast(120%) brightness(80%);
  }
`
document.head.appendChild(style)
