$(document).ready(()=>{
    
    $(".LYAF-preview-list").each(function () {
        $(this).magnificPopup({
          delegate: ".LYAF-aaaa",
          type: "image",
          gallery: {
            enabled: true,
          },
        });
      });

    $(".LYAF-preview-list .LYAF-image-preview #size").each(async (i,v) => {
        const url = $(v)[0].dataset.url
        $(v).html(await getSize(url))
    })

    $(".edit-btn").click(function(){
        const id = this.dataset.id
        $(".edit-modal").modal("show")
    })
})

const getSize = async (url)=> {
    const file = await urlToObject(url)
    return humanFileSize(file.size, "");
}
/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
 function humanFileSize(bytes, si = true, dp = 1) {
    const thresh = si ? 1000 : 1024;
  
    if (Math.abs(bytes) < thresh) {
      return bytes + " B";
    }
  
    const units = si
      ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    let u = -1;
    const r = 10 ** dp;
  
    do {
      bytes /= thresh;
      ++u;
    } while (
      Math.round(Math.abs(bytes) * r) / r >= thresh &&
      u < units.length - 1
    );
  
    return bytes.toFixed(dp) + " " + units[u];
  }
  
  /**
   * Convert url to File.
   *
   * @param an url.
   *
   * @return An File object.
   */
  const urlToObject = async (url, name) => {
    const response = await fetch(url);
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], name, { type: blob.type });
    return file;
  };