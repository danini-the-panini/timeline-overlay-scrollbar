let addBtn = document.getElementById('add')
let removeBtn = document.getElementById('remove')

addBtn?.addEventListener('click', () => {
  let newP = document.createElement('P')
  newP.textContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
  dolore magna aliqua. Donec massa sapien faucibus et molestie. Gravida neque convallis a cras semper auctor
  neque vitae. Sollicitudin tempor id eu nisl nunc mi. Non odio euismod lacinia at quis risus. Orci eu
  lobortis elementum nibh tellus. Mauris vitae ultricies leo integer malesuada nunc vel. Vulputate odio ut
  enim blandit volutpat maecenas volutpat blandit. Integer enim neque volutpat ac. Sit amet nulla facilisi
  morbi tempus iaculis urna id. Sit amet mattis vulputate enim nulla aliquet porttitor lacus. Nunc sed id
  semper risus in hendrerit gravida rutrum. Dictum fusce ut placerat orci nulla pellentesque dignissim. A
  condimentum vitae sapien pellentesque habitant morbi tristique senectus. Ut lectus arcu bibendum at varius
  vel pharetra.`
  document.querySelector('article')?.append(newP)
})

removeBtn?.addEventListener('click', () => {
  document.querySelector('article')?.lastChild?.remove()
})