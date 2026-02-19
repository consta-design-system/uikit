import { IconFileAnimation } from '@consta/icons/IconFileAnimation';
import { IconFileArchive } from '@consta/icons/IconFileArchive';
import { IconFileAudio } from '@consta/icons/IconFileAudio';
import { IconFileCode } from '@consta/icons/IconFileCode';
import { IconFileConfig } from '@consta/icons/IconFileConfig';
import { IconFileDatabase } from '@consta/icons/IconFileDatabase';
import { IconFileDisk } from '@consta/icons/IconFileDisk';
import { IconFileDocument } from '@consta/icons/IconFileDocument';
import { IconFileFont } from '@consta/icons/IconFileFont';
import { IconFileImage } from '@consta/icons/IconFileImage';
import { IconFileMail } from '@consta/icons/IconFileMail';
import { IconFilePDF } from '@consta/icons/IconFilePDF';
import { IconFilePresentation } from '@consta/icons/IconFilePresentation';
import { IconFileProgram } from '@consta/icons/IconFileProgram';
import { IconFileScheme } from '@consta/icons/IconFileScheme';
import { IconFileTable } from '@consta/icons/IconFileTable';
import { IconFileTransparent } from '@consta/icons/IconFileTransparent';
import { IconFileVector } from '@consta/icons/IconFileVector';
import { IconFileVideo } from '@consta/icons/IconFileVideo';

import { FileConfig } from './types';

export const defaultConfig: FileConfig = {
  // code
  'asp': { color: 'var(--file-color-code)', icon: IconFileCode },
  'aspx': { color: 'var(--file-color-code)', icon: IconFileCode },
  'cer': { color: 'var(--file-color-code)', icon: IconFileCode },
  'cmf': { color: 'var(--file-color-code)', icon: IconFileCode },
  'cgi': { color: 'var(--file-color-code)', icon: IconFileCode },
  'pl': { color: 'var(--file-color-code)', icon: IconFileCode },
  'css': { color: 'var(--file-color-code)', icon: IconFileCode },
  'htm': { color: 'var(--file-color-code)', icon: IconFileCode },
  'html': { color: 'var(--file-color-code)', icon: IconFileCode },
  'js': { color: 'var(--file-color-code)', icon: IconFileCode },
  'jsp': { color: 'var(--file-color-code)', icon: IconFileCode },
  'part': { color: 'var(--file-color-code)', icon: IconFileCode },
  'php': { color: 'var(--file-color-code)', icon: IconFileCode },
  'py': { color: 'var(--file-color-code)', icon: IconFileCode },
  'rss': { color: 'var(--file-color-code)', icon: IconFileCode },

  // font
  'fnt': { color: 'var(--file-color-font)', icon: IconFileFont },
  'fon': { color: 'var(--file-color-font)', icon: IconFileFont },
  'otf': { color: 'var(--file-color-font)', icon: IconFileFont },
  'ttf': { color: 'var(--file-color-font)', icon: IconFileFont },

  // disk
  'bin': { color: 'var(--file-color-disk)', icon: IconFileDisk },
  'dmg': { color: 'var(--file-color-disk)', icon: IconFileDisk },
  'iso': { color: 'var(--file-color-disk)', icon: IconFileDisk },
  'toast': { color: 'var(--file-color-disk)', icon: IconFileDisk },
  'vcd': { color: 'var(--file-color-disk)', icon: IconFileDisk },

  // executive
  'bat': { color: 'var(--file-color-executive)', icon: IconFileProgram },
  'com': { color: 'var(--file-color-executive)', icon: IconFileProgram },
  'exe': { color: 'var(--file-color-executive)', icon: IconFileProgram },
  'msi': { color: 'var(--file-color-executive)', icon: IconFileProgram },
  'sh': { color: 'var(--file-color-executive)', icon: IconFileProgram },
  'wsf': { color: 'var(--file-color-executive)', icon: IconFileProgram },

  // config
  'conf': { color: 'var(--file-color-config)', icon: IconFileConfig },
  'ini': { color: 'var(--file-color-config)', icon: IconFileConfig },

  // database
  'sql': { color: 'var(--file-color-database)', icon: IconFileDatabase },
  'db': { color: 'var(--file-color-database)', icon: IconFileDatabase },
  'dbf': { color: 'var(--file-color-database)', icon: IconFileDatabase },
  'mdb': { color: 'var(--file-color-database)', icon: IconFileDatabase },

  // presentation
  'pptx': {
    color: 'var(--file-color-presentation)',
    icon: IconFilePresentation,
  },
  'ppt': {
    color: 'var(--file-color-presentation)',
    icon: IconFilePresentation,
  },
  'key': {
    color: 'var(--file-color-presentation)',
    icon: IconFilePresentation,
  },
  'odp': {
    color: 'var(--file-color-presentation)',
    icon: IconFilePresentation,
  },
  'pps': {
    color: 'var(--file-color-presentation)',
    icon: IconFilePresentation,
  },

  // table
  'xlsx': { color: 'var(--file-color-table)', icon: IconFileTable },
  'xsl': { color: 'var(--file-color-table)', icon: IconFileTable },
  'csv': { color: 'var(--file-color-table)', icon: IconFileTable },
  'xml': { color: 'var(--file-color-table)', icon: IconFileTable },

  // document
  'docx': { color: 'var(--file-color-document)', icon: IconFileDocument },
  'doc': { color: 'var(--file-color-document)', icon: IconFileDocument },
  'log': { color: 'var(--file-color-document)', icon: IconFileDocument },
  'sav': { color: 'var(--file-color-document)', icon: IconFileDocument },
  'odt': { color: 'var(--file-color-document)', icon: IconFileDocument },
  'rtf': { color: 'var(--file-color-document)', icon: IconFileDocument },
  'tex': { color: 'var(--file-color-document)', icon: IconFileDocument },
  'txt': { color: 'var(--file-color-document)', icon: IconFileDocument },
  'wpd': { color: 'var(--file-color-document)', icon: IconFileDocument },

  // pdf
  'pdf': { color: 'var(--file-color-pdf)', icon: IconFilePDF },

  // audio
  'aif': { color: 'var(--file-color-audio)', icon: IconFileAudio },
  'cda': { color: 'var(--file-color-audio)', icon: IconFileAudio },
  'midi': { color: 'var(--file-color-audio)', icon: IconFileAudio },
  'mp3': { color: 'var(--file-color-audio)', icon: IconFileAudio },
  'mpa': { color: 'var(--file-color-audio)', icon: IconFileAudio },
  'ogg': { color: 'var(--file-color-audio)', icon: IconFileAudio },
  'wav': { color: 'var(--file-color-audio)', icon: IconFileAudio },
  'wma': { color: 'var(--file-color-audio)', icon: IconFileAudio },
  'wpl': { color: 'var(--file-color-audio)', icon: IconFileAudio },

  // image
  'bmp': { color: 'var(--file-color-image)', icon: IconFileImage },
  'ico': { color: 'var(--file-color-image)', icon: IconFileImage },
  'jpg': { color: 'var(--file-color-image)', icon: IconFileImage },
  'jpeg': { color: 'var(--file-color-image)', icon: IconFileImage },
  'psd': { color: 'var(--file-color-image)', icon: IconFileImage },
  'scr': { color: 'var(--file-color-image)', icon: IconFileImage },
  'tif': { color: 'var(--file-color-image)', icon: IconFileImage },
  'tiff': { color: 'var(--file-color-image)', icon: IconFileImage },
  'webp': { color: 'var(--file-color-image)', icon: IconFileImage },
  'ai': { color: 'var(--file-color-image)', icon: IconFileVector },
  'ps': { color: 'var(--file-color-image)', icon: IconFileVector },
  'svg': { color: 'var(--file-color-image)', icon: IconFileVector },
  'png': { color: 'var(--file-color-image)', icon: IconFileTransparent },
  'gif': { color: 'var(--file-color-image)', icon: IconFileAnimation },

  // video
  '3g2': { color: 'var(--file-color-video)', icon: IconFileVideo },
  '3gp': { color: 'var(--file-color-video)', icon: IconFileVideo },
  'avi': { color: 'var(--file-color-video)', icon: IconFileVideo },
  'flv': { color: 'var(--file-color-video)', icon: IconFileVideo },
  'h264': { color: 'var(--file-color-video)', icon: IconFileVideo },
  'm4v': { color: 'var(--file-color-video)', icon: IconFileVideo },
  'mkv': { color: 'var(--file-color-video)', icon: IconFileVideo },
  'mov': { color: 'var(--file-color-video)', icon: IconFileVideo },
  'mp4': { color: 'var(--file-color-video)', icon: IconFileVideo },
  'mpg': { color: 'var(--file-color-video)', icon: IconFileVideo },
  'mpeg': { color: 'var(--file-color-video)', icon: IconFileVideo },
  'rm': { color: 'var(--file-color-video)', icon: IconFileVideo },
  'swf': { color: 'var(--file-color-video)', icon: IconFileVideo },
  'vob': { color: 'var(--file-color-video)', icon: IconFileVideo },
  'webm': { color: 'var(--file-color-video)', icon: IconFileVideo },
  'wmv': { color: 'var(--file-color-video)', icon: IconFileVideo },

  // mail
  'email': { color: 'var(--file-color-mail)', icon: IconFileMail },
  'eml': { color: 'var(--file-color-mail)', icon: IconFileMail },
  'emlx': { color: 'var(--file-color-mail)', icon: IconFileMail },
  'msg': { color: 'var(--file-color-mail)', icon: IconFileMail },
  'oft': { color: 'var(--file-color-mail)', icon: IconFileMail },
  'ost': { color: 'var(--file-color-mail)', icon: IconFileMail },
  'pst': { color: 'var(--file-color-mail)', icon: IconFileMail },
  'vcf': { color: 'var(--file-color-mail)', icon: IconFileMail },

  // scheme
  'vsd': { color: 'var(--file-color-scheme)', icon: IconFileScheme },
  'drawio': { color: 'var(--file-color-scheme)', icon: IconFileScheme },

  // archive
  '7z': { color: 'var(--file-color-archive)', icon: IconFileArchive },
  'arj': { color: 'var(--file-color-archive)', icon: IconFileArchive },
  'deb': { color: 'var(--file-color-archive)', icon: IconFileArchive },
  'pkg': { color: 'var(--file-color-archive)', icon: IconFileArchive },
  'rar': { color: 'var(--file-color-archive)', icon: IconFileArchive },
  'rpm': { color: 'var(--file-color-archive)', icon: IconFileArchive },
  'targz': { color: 'var(--file-color-archive)', icon: IconFileArchive },
  'z': { color: 'var(--file-color-archive)', icon: IconFileArchive },
  'zip': { color: 'var(--file-color-archive)', icon: IconFileArchive },
  'tar': { color: 'var(--file-color-archive)', icon: IconFileArchive },
};
